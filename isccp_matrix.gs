function isccp_matrix( args )
  'reinit'
  rc = gsfallow( 'on' )

  set_cnf()




if( _type = '7x7' )
*  _min = 0.2 ; _max = 10 ; _int = 0.2
  _min = 0.5 ; _max = 5 ; _int = 0.5
  _dmin = -2.5 ; _dmax = 2.5 ; _dint = 0.5
endif
if( _type = '3x3' )
*  _min = 0.4 ; _max = 20 ; _int = 0.4
*  _min = 1.0 ; _max = 10 ; _int = 1.0
  _min = 2 ; _max = 20 ; _int = 2.0
  _dmin = -5.0 ; _dmax = 5.0 ; _dint = 1.0
endif

  set_region()
  set_time()


***************************************************************
* Calculate - create topography reference
***************************************************************
f = 1
while( f <= _fmax )
  if( _var_pres.f != '' & _var_pres.f != '_var_pres.'f )
    'set dfile '_f2df.f+1
    'set lat '_latmin' '_latmax
    'set lon '_lonmin' '_lonmax
    'set t 1'
    'set z 1'
    zdef = qctlinfo( _f2df.f+1, 'zdef', 1 )
    if( _time_start.f != '' ) 
      prex( 'prs'f' = ave( max('_var_pres.f'/100,z=1,z='zdef'), time='_time_start.f', time='_time_end.f' )' )
    else
      prex( 'clave max('_var_pres.f'/100,z=1,z='zdef') 'clim.f' prs'f )
    endif
  endif
  f = f + 1
endwhile


***************************************************************
* Calculate mask
***************************************************************
* TODO: for lower-level cloud, topography should be masked!

f = 1
while( f <= _fmax )
  say 'Processing #'f' (mask)'
  'set dfile '_f2df.f
  'set lat '_latmin' '_latmax
  'set lon '_lonmin' '_lonmax
  'set t 1'
  'set z 1'

  if( _type.f = 'nicam'  )
    if( _time_start.f != '' & _time_end.f != '' )
      prex( 'mask'f' = ave( dfq_isccp2.'_f2df.f', time='_time_start.f', time='_time_end.f' )' )
    else
      prex( 'clave dfq_isccp2.'_f2df.f' '_clim_arg.f' mask'f )
    endif
  endif

  if( _type.f = 'satellite' )
    if( _time_start.f != '' & _time_end.f != '' )
      prex( 'mask'f' = ave( 'var30', time='_time_start.f', time='_time_end.f' )' )
    else
      prex( 'clave var30 '_clim_arg.f' mask'f )
     endif
  endif

  'mask'f' = const( const( mask'f', 1 ), 0, -u )'

  f = f + 1
endwhile

* mask -> other mask
f = 1
while( f <= _fmax )
  say 'Processing #'f' (mask-mask)'
  'set dfile '_f2df.f
  'set lat '_latmin' '_latmax
  'set lon '_lonmin' '_lonmax
  'set t 1'
  'set z 1'

  ff = 1
  while( ff <= _fmax )
    'mask'f' = mask'f' * lterp(mask'ff', mask'f')'
    ff = ff + 1
  endwhile

  f = f + 1
endwhile





***************************************************************
* Calculate cloud fraction
***************************************************************
f = 1
while( f <= _fmax )
  say 'Processing #'f' : _type.'f' = '_type.f
  'set dfile '_f2df.f

************************ NICAM ****************************
  if( _type.f = 'nicam' )
    'set lat '_latmin' '_latmax
    'set lon '_lonmin' '_lonmax
    'set t 1'

* i: thin -> thick
* j: high -> low
    z = 1
    while( z <= 49 )
      say z
      'set z 'z
      if( _time_start.f != '' & _time_end.f != '' )
        prex( 'a'f'z'z' = ave( maskout(100*dfq_isccp2.'_f2df.f', mask'f'(t=1)-0.5), time='_time_start.f', time='_time_end.f' )' )
      else
        prex( 'clave maskout(100*dfq_isccp2.'_f2df.f',mask'f'(t=1)-0.5) '_clim_arg.f' a'f'z'z )
      endif
      z = z + 1
    endwhile
    'set x 1' ; 'set y 1'

    if( _type = '3x3' )
*   i:
*      2-3: thin
*      4-5: med
*      6-7: thick
*   j:
*      1-3: high
*      4-5: middle
*      6-7: low
      imax = 3
      optmin.1 = 2 ; optmax.1 = 3
      optmin.2 = 4 ; optmax.2 = 5
      optmin.3 = 6 ; optmax.3 = 7
      jmax = 3
      topmin.1 = 1 ; topmax.1 = 3
      topmin.2 = 4 ; topmax.2 = 5
      topmin.3 = 6 ; topmax.3 = 7
      pb.1 = 0
      pb.2 = 440
      pb.3 = 680
    endif

    if( _type = '7x7' )
      imax = 7
      jmax = 7
      i = 1
      while( i <= 7 )
        optmin.i = i ; optmax.i = i
        topmin.i = i ; topmax.i = i
        i = i + 1
      endwhile
      pb.1 = 0
      pb.2 = 180
      pb.3 = 310
      pb.4 = 440
      pb.5 = 560
      pb.6 = 680
      pb.7 = 800
    endif

* calculate value in each category
    'set x 1'
    'set y 1'
    j = 1
    while( j <= jmax )
      i = 1
      while( i <= imax )
        value.f.i.j = 0

        q = topmin.j
        while( q <= topmax.j )
          p = optmin.i
          while( p <= optmax.i )

*        'set z 'q*7+p-7
*        value.f.i.j = value.f.i.j + v2s( 'a'f )

            z = q*7+p-7

            prex( 'temp = aave( maskout( a'f'z'z', prs'f'-'pb.j' ), lon='_lonmin', lon='_lonmax', lat='_latmin', lat='_latmax' )' )
            value.f.i.j = value.f.i.j + v2s( 'temp' )

            p = p + 1
          endwhile
          q = q + 1
        endwhile

        say f' 'i' 'j' 'value.f.i.j

        i = i + 1
      endwhile
      j = j + 1
    endwhile

  endif

************************ satellite ****************************
  if( _type.f = 'satellite' )
    'set x 1' ; 'set y 1' ; 'set z 1'
    'set t 1'

    if( _type = '3x3' )
      imin = 1
      imax = 3
      jmax = 3

      if( _run.f = 'ISCCP_D2_OBS' )
*       High-Top
        var.1.1 = 'v101'
        var.2.1 = 'v106'
        var.3.1 = 'v111'
*       Middle-Top
        var.1.2 = 'v71+v86'
        var.2.2 = 'v76+v91'
        var.3.2 = 'v81+v96'
*       Low-Top
        var.1.3 = 'v41+v56'
        var.2.3 = 'v46+v61'
        var.3.3 = 'v51+v66'
      endif
      if( _run.f = 'ISCCP_D1_OBS' )
*       High-Top
        var.1.1 = 'hthin'
        var.2.1 = 'hmed'
        var.3.1 = 'hthick'
*       Middle-Top
        var.1.2 = 'mthin'
        var.2.2 = 'mmed'
        var.3.2 = 'mthick'
*       Low-Top
        var.1.3 = 'lthin'
        var.2.3 = 'lmed'
        var.3.3 = 'lthick'
      endif

    endif

    if( _type = '7x7' )
      imin = 2
      imax = 7
      jmax = 7

      p = 30
      j = 1
      while( j <= jmax )
        i = imin
        while( i <= imax )
          var.i.j = 'var'p
          p = p + 1
          i = i + 1
        endwhile
        j = j + 1
      endwhile
    endif

    j = 1
    while( j <= jmax )

      if( imin = 2 ); value.f.1.j = -1; endif
      i = imin
      while( i <= imax )

        'set lon '_lonmin' '_lonmax
        'set lat '_latmin' '_latmax

        if( _time_start.f != '' & _time_end.f != '' )
          prex( 'var'f'i'i'j'j' = ave( 'var.i.j', time='_time_start.f', time='_time_end.f' )' )
        else
          prex( 'clave 'var.i.j' '_clim_arg.f' var'f'i'i'j'j )
        endif
        'var'f'i'i'j'j' = maskout(var'f'i'i'j'j',mask'f'(t=1)-0.5)'

        'set x 1' ; 'set y 1'
        'temp = aave( maskout(var'f'i'i'j'j',mask'f'(t=1)-0.5), lon='_lonmin', lon='_lonmax', lat='_latmin', lat='_latmax' )'

        value.f.i.j = v2s( 'temp' )
        say f' 'i' 'j' 'value.f.i.j

        i = i + 1
      endwhile
      j = j + 1
    endwhile

  endif


  f = f + 1
endwhile


********************* draw *******************************
if( _type = '7x7' )
  boxwidth  = 1.0
  boxheight = 0.8
*  boxwidth  = 0.4
*  boxheight = 0.3
*  font1 = 'tiny'
*  font2 = 'tiny'
  font1 = 'large'
  font2 = 'large'
  xmin = 2.0
  ymax = 7.2
endif
if( _type = '3x3' )
  boxwidth  = 2.0
  boxheight = 1.6
  font1 = 'large'
  font2 = 'large'
  xmin = 3.0
  ymax = 6.4
endif

dmax = 1
d = 1
while( d <= 6 )
  if( _disp.d != '' ) ; dmax = d ; endif
  d = d + 1
endwhile

d = 1
while( d <= dmax )
*  i = 1
*  j = 4-d
*  if( j <= 0 ) ; i = 2 ; j = j + 3 ; endif
  i = d
  j = 2
  if( i >= 4 ) ; i = i-3 ; j = 1 ; endif

  if( dmax = 1 )
    'set vpage 0 11 0 8.5'
  endif
  if( dmax >= 5 )
*'set vpage 0 4.0 0 3.1'
    vxmin = 3.5 * (i-1)
    vxmax = vxmin + 4.0
    vymin = 3.5 * (j-1)
    vymax = vymin + 3.5
    'set vpage 'vxmin' 'vxmax' 'vymin' 'vymax
  endif

  f1 = subwrd( _disp.d, 1 )
  f2 = subwrd( _disp.d, 2 )
  if( f1 = '' ) ; d = d + 1 ; continue ;  endif

  title1 = 'ISCCP CF [%] for 'term', '_region
  if( f2 = '' )
    title2 = '('_run.f1')'
    kind = 'white-(0)->grainbow'
*  kind = 'white->blue->purple'
    'color '_min' '_max' '_int' -gxout shaded -kind 'kind' -xcbar 1.4 9.6 0.7 1.0 -line on -fw 0.18 -fh 0.195 -ft 7.2 -edge triangle'
  else
    title2 = '('_run.f1') - ('_run.f2')'
*    kind = 'white-(0)->grainbow'
    kind = 'purple->blue->white->red->maroon'
    'color '_dmin' '_dmax' '_dint' -gxout shaded -kind 'kind' -xcbar 1.4 9.6 0.7 1.0 -line on -fw 0.18 -fh 0.195 -ft 7.2 -edge triangle'
  endif

  j = 1
  while( j <= jmax )
    i = 1
    while( i <= imax )

      posx = 1 + boxwidth * i
      posy = 8 - boxheight * j
      if( f2 = '' )
        if( value.f1.i.j < 0 ) ; i = i + 1 ; continue ; endif
        value = value.f1.i.j
        color = v2c( value, _min, _max, _int )
      else
        if( value.f1.i.j < 0 | value.f2.i.j < 0 ) ; i = i + 1 ; continue ; endif
*        value = value.f2.i.j - value.f1.i.j
        value = value.f1.i.j - value.f2.i.j
        color = v2c( value, _dmin, _dmax, _dint )
      endif
      

      'set line 'color
      'draw recf 'posx' 'posy-boxheight' 'posx+boxwidth' 'posy

      'setfont 'font1' -base c'
*    'set string 3'
      'set string 1'
*      sign = '' ; if( value > 0 & sw = 'diff' ) ; sign = '+' ; endif
      sign = '' ; if( value > 0 & f2 != '' ) ; sign = '+' ; endif
      'draw string 'posx+boxwidth/2' 'posy-boxheight/2' 'sign%math_format('%.2f',value )


      i = i + 1
    endwhile
    j = j + 1
  endwhile

* vertical
  'set line 1'
  if( _type = '7x7' ) ; 'draw line 2.0 1.6 2.0 'ymax ; endif
  'draw line 3.0 1.6 3.0 'ymax
  'draw line 5.0 1.6 5.0 'ymax
  'draw line 7.0 1.6 7.0 'ymax
  'draw line 9.0 1.6 9.0 'ymax

* horizontal
  'draw line 'xmin' 1.6 9.0 1.6'
  'draw line 'xmin' 3.2 9.0 3.2'
  'draw line 'xmin' 4.8 9.0 4.8'
  'draw line 'xmin' 'ymax' 9.0 'ymax

  'setfont 'font2
  if( _type = '7x7' ) ; 'draw string 2.5 1.4 Invis' ; endif
  'draw string 4.0 1.4 Thin'
  'draw string 6.0 1.4 Medium'
  'draw string 8.0 1.4 Thick'

  'setfont 'font2' -angle 90 base bc'
  'draw string 'xmin-0.2' 2.4 Low'
  'draw string 'xmin-0.2' 4.0 Middle'
  if( _type = '7x7' ) ; 'draw string 'xmin-0.2' 6.0 High' ; endif
  if( _type = '3x3' ) ; 'draw string 'xmin-0.2' 5.6 High' ; endif

  if( _type = '7x7' )
    'setfont large'
    'draw string 5.5 7.9 'title1
    'setfont large'
    'draw string 5.5 7.5 'title2
    endif

  if( _type = '3x3' )
    'setfont large'
    'draw string 6.0 7.1 'title1
    'setfont large'
    'draw string 6.0 6.7 'title2
  endif

  d = d + 1
endwhile

if( _save != '_save' & _save != '' )
*  'save '_save
  prex( 'gxprint '_save'.eps white' )
endif


return



function v2c( value, min, max, int )
  cn = -1
  if( value < min ) ; cn = 16; endif
  curv = min
  curc = 17
  
  while( curv + int <= max )
    if( curv <= value & value < curv + int )
      cn = curc
      break
    endif
    curv = curv + int
    curc = curc + 1
  endwhile

  if( value > max ) ; cn = curc; endif
  
return cn


function v2s( var )
  'd 'var
  value = subwrd( result, 4 )
return value


function set_cnf()
* set default values

*_sw = 'raw'
*_f1 = 1
*_f2 = ''
_type = '7x7'
i = 1
while( i <= 6 )
  _disp.i = ''
  i = i + 1
endwhile

*----- load cnf_latlon.gsf
  rc = gsfpath( 'cnf cnf_sample' )
  ret = cnf_isccp_matrix()

if(1=2)
* check existence of cnf file
ret = read( cnf'.gsf' )
stat = sublin( ret, 1 )
if( stat != 0 )
  ret = read( cnf )
  stat = sublin( ret, 1 )
  if( stat != 0 )
    say 'error: 'cnf'.gsf does not exist'
    exit
  else
    cnf = substr( cnf, 1, math_strlen(cnf)-4 )
  endif
endif

* check multiple-execution
ret = read( 'inc_isccp_matrix.gsf' )
stat = sublin( ret, 1 )
if( stat = 0 )
  say 'error: temporal file inc_isccp_matrix.gsf exists. Please remove.'
  say '(illegal multiple execution may occur)'
  exit
endif

* load cnf
ret = write( 'inc_isccp_matrix.gsf', 'function inc_isccp_matrix()' )
ret = write( 'inc_isccp_matrix.gsf', 'ret = 'cnf'()' )
ret = write( 'inc_isccp_matrix.gsf', 'return ret' )
ret = close( 'inc_isccp_matrix.gsf' )
ret = inc_isccp_matrix()
'!rm inc_isccp_matrix.gsf'
endif

* set default and/or necessary values necessary after loading cnf


return
