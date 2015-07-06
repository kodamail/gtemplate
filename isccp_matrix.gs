function isccp_matrix( args )
'reinit'

'!pwd > pwd.tmp'
ret = read( 'pwd.tmp' )
pwd = sublin( ret, 2 )
'!rm -f pwd.tmp'
gs = pwd'/isccp_matrix.gs'
rc = gsfallow( 'on' )

cnf = subwrd( args, 1 )
if( cnf = '' )
  say 'usage: isccp_matrix.gs cnf_isccp_matrix.cnf'
  exit
endif

* set default values

_sw = 'raw'
_f1 = 1
_f2 = ''
_type = '7x7'
i = 1
while( i <= 6 )
  _disp.i = ''
  i = i + 1
endwhile


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

* set default and/or necessary values necessary after loading cnf


***************************************************************
***************************************************************
***************************************************************


*run.1 = 'AMIP-CNTL'
*ctl.1 = '/cwork5/kodama/nicam_product/amip/N12/197806/gl09/control/run01/data_conv/isccp/144x72x49/monthly_mean/dfq_isccp2/dfq_isccp2.ctl'
*ctl_prs.1 = '/cwork5/kodama/nicam_product/amip/N12/197806/gl09/control/run01/data_conv/ml_zlev/144x72x38/monthly_mean/ms_pres/ms_pres.ctl'

*run.2 = 'AMIP-GW'
*ctl.2 = '/cwork5/kodama/nicam_product/amip/N12/207406/gl09/control/run01/data_conv/isccp/144x72x49/monthly_mean/dfq_isccp2/dfq_isccp2.ctl'
*ctl_prs.2 = '/cwork5/kodama/nicam_product/amip/N12/207406/gl09/control/run01/data_conv/ml_zlev/144x72x38/monthly_mean/ms_pres/ms_pres.ctl'

*zdef = 38

*run.3 = 'ISCCP obs. (D1)'
*ctl.3 = '/cwork5/kodama/dataset/isccp/D1nat/monthly/isccp_d1.ctl'
*ctl_prs.3 = ""



if( _sw = 'raw' & _type = '7x7' )
*  _min = 0.2 ; _max = 10 ; _int = 0.2
  _min = 0.5 ; _max = 5 ; _int = 0.5
endif
if( _sw = 'raw' & _type = '3x3' )
*  _min = 0.4 ; _max = 20 ; _int = 0.4
*  _min = 1.0 ; _max = 10 ; _int = 1.0
  _min = 2 ; _max = 20 ; _int = 2.0
endif
if( _sw = 'diff' & _type = '7x7' )
  _min = -2.5 ; _max = 2.5 ; _int = 0.5
endif
if( _sw = 'diff' & _type = '3x3' )
  _min = -5.0 ; _max = 5.0 ; _int = 1.0
endif


if( _region = 'global' | _region = '_region' | _region = '' )
                               latmin = -90 ; latmax = 90 ; lonmin = 0   ; lonmax = 360 ; endif
if( _region = 'indian'     ) ; latmin = -30 ; latmax = 30 ; lonmin = 0   ; lonmax = 120 ; endif
if( _region = 'pacific'    ) ; latmin = -30 ; latmax = 30 ; lonmin = 120 ; lonmax = 240 ; endif
if( _region = 'atlantic'   ) ; latmin = -30 ; latmax = 30 ; lonmin = 240 ; lonmax = 360 ; endif
if( _region = 'indwpac'    ) ; latmin = -30 ; latmax = 30 ; lonmin = 60  ; lonmax = 180 ; endif
if( _region = 'epac'       ) ; latmin = -30 ; latmax = 30 ; lonmin = 180 ; lonmax = 300 ; endif
if( _region = 'atlantic'   ) ; latmin = -30 ; latmax = 30 ; lonmin = 240 ; lonmax = 360 ; endif
if( _region = 'nhpac'      ) ; latmin = 20  ; latmax = 80 ; lonmin = 120 ; lonmax = 240 ; endif
if( _region = 'nhatlantic' ) ; latmin = 20  ; latmax = 80 ; lonmin = 240 ; lonmax = 360 ; endif
if( _region = 'east_asia'  ) ; latmin = 0   ; latmax = 50 ; lonmin = 80  ; lonmax = 180 ; endif
if( _region = 'lowlat'     ) ; latmin = -60 ; latmax = 60 ; lonmin = 0   ; lonmax = 360 ; endif
if( _region = 'tropics'    ) ; latmin = -30 ; latmax = 30 ; lonmin = 0   ; lonmax = 360 ; endif



***************************************************************
* Automatic Time Setting
***************************************************************
if( _year = 'clim' ) ; _year = '%y' ; endif

term = ''
if( _time_start = '_time_start' | _time_start = '' )
  if( _month >= 1 & _month <= 12 )
    cm   = cmonth( _month, 3 )
    cmpp = cmonth( _month+1, 3 )
    _yearpp = _year
    if( _month = 12 )
      if( _year = '%y' ) ; _yearpp = '%ypp'
      else               ; _yearpp = _yearpp + 1 ; endif
    endif
*    term = cmonth( _month )
    term = cmonth( _month ) % ' ' % _year
    _time_start = '01'cm''_year
    _time_endpp = '01'cmpp''_yearpp
  endif
  if( _month = 345 )
*    term = 'MAM'
    term = 'MAM '_year
    _time_start = '01mar'_year
    _time_endpp = '01jun'_year
  endif
  if( _month = 678 )
*    term = 'JJA'
    term = 'JJA '_year
    _time_start = '01jun'_year
    _time_endpp = '01sep'_year
  endif
  if( _month = 901 )
*    term = 'SON'
    term = 'SON '_year
    _time_start = '01sep'_year
    _time_endpp = '01dec'_year
  endif
  if( _month = 212 )
*    term = 'DJF'
    term = 'DJF '_year
    if( _year = '%y' ) ; _yearpp = '%ypp'
    else               ; _yearpp = _year + 1 ; endif
    _time_start = '01dec'_year
    _time_endpp = '01mar'_yearpp
  endif
  if( _month = 999 )
*    term = 'ANU'
    term = 'ANU '_year
    if( _year = '%y' ) ; _yearpp = '%ypp'
    else               ; _yearpp = _year + 1 ; endif
    _time_start = '01jan'_year
    _time_endpp = '01jan'_yearpp
  endif
  if( substr(_month,1,3) = 999 )
    month = substr( _month, 4, 2 )
    cm   = cmonth( month, 3 )
*    term = 'ANU'
    term = 'ANU (' % cm % _year % '-)'
    if( _year = '%y' ) ; _yearpp = '%ypp'
    else               ; _yearpp = _year + 1 ; endif
    _time_start = '01'cm''_year
    _time_endpp = '01'cm''_yearpp
  endif
else
  term = _time_start' <= time < '_time_endpp
  _year = ''
endif

* _time_start, _time_end -> _time_start.f, _time_end.f
f = 1
flag = 0
while( f <= _fmax )
  'set dfile '_f2df.f
  'set z 1'

  if( _time_start.f != '_time_start.'f & _time_start.f != '' )
    _clim_arg.f = ''

    _time_start.f = t2time( time2t( _time_start.f ) )

    if( _time_end.f = '_time_end.'f | _time_end.f = '' )
      _time_end.f   = t2time( time2t( _time_endpp.f ) - 1 )
    endif

    _run.f = _run.f % '(' % _time_start.f % '-' % _time_end.f % ')'
    say _run.f

  else ; if( _clim_arg.f != '_clim_arg.'f & _clim_arg.f != '' )
    _time_start.f = ''
    _time_end.f   = ''
    _run.f = _run.f % '(' % _clim_arg.f % ')'
    say _run.f

  else ; if( _year = '%y' )

    if( valnum(_year_start.f) != 1 )
      _year_start.f = _year_start
    endif
    if( valnum(_year_end.f) != 1 )
      _year_end.f = _year_end
    endif

*   2001, 2002: dummy
    tmp = strrep( _time_endpp, '%ypp', 2002 )
    tmp = strrep(        tmp, '%y'  , 2001 )
    tmp = t2time( time2t( tmp ) - 1 )
    tmp = strrep(        tmp, 2002, '%ypp' )
    _time_end.f = strrep( tmp, 2001, '%y' )
*    tmp = strrep( _time_endpp, '%ypp', _year_end.f+1 )
*    tmp = strrep(        tmp, '%y'  , _year_end.f )
*    tmp = t2time( time2t( tmp ) - 1 )
*    tmp = strrep(        tmp, _year_end.f+1, '%ypp' )
*    _time_end.f = strrep( tmp, _year_end.f, '%y' )

    tmp = strrep( _time_start, '%ypp', _year_end.f+1 )
    tmp = strrep(        tmp, '%y'  , _year_end.f )
    tmp = t2time( time2t( tmp ) )
    tmp = strrep(        tmp, _year_end.f+1, '%ypp' )
    _time_start.f = strrep( tmp, _year_end.f, '%y' )

    _clim_arg.f = _time_start.f % ' ' % _time_end.f % ' ' % _year_start.f % ' '\
 % _year_end.f
    say _run.f % ': ' % _clim_arg.f
    _time_start.f = ''
    _time_end.f   = ''

  else
    _time_start.f = t2time( time2t( _time_start ) )
    _time_end.f   = t2time( time2t( _time_endpp ) - 1 )
    _clim_arg.f = ''
    say _run.f % ': ' % _time_start.f % ' - ' % _time_end.f

  endif ; endif ; endif

  f = f + 1
endwhile
say ''

if( _year = '%y' ) ; _year = _year_start % '_' _year_end  ; endif



***************************************************************
* Calculate - create topography reference
***************************************************************
f = 1
while( f <= _fmax )
  if( _var_pres.f != '' & _var_pres.f != '_var_pres.'f )
    'set dfile '_f2df.f+1
    'set lat 'latmin' 'latmax
    'set lon 'lonmin' 'lonmax
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
  'set lat 'latmin' 'latmax
  'set lon 'lonmin' 'lonmax
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
  'set lat 'latmin' 'latmax
  'set lon 'lonmin' 'lonmax
  'set t 1'
  'set z 1'

  ff = 1
  while( ff <= _fmax )
    'mask'f' = mask'f' * lterp(mask'ff', mask'f')'
    ff = ff + 1
  endwhile

  f = f + 1
endwhile




if( _sw = 'raw' )
  title1 = 'ISCCP Cloud Fraction [%] for 'term
  title2 = '('_run._f1')'
  kind = 'white-(0)->grainbow'
*  kind = 'white->blue->purple'

*  'color '_min' '_max' '_int' -kind white->blue->purple -xcbar 1 10 0.7 1.0 -fstep 4 -line on'
*  'color '_min' '_max' '_int' -kind white->blue->purple -xcbar 1 10 0.7 1.0 -line on -fw 0.18 -fh 0.195 -ft 7.2 -fo 4 -fs 5'

    'color '_min' '_max' '_int' -kind 'kind' -xcbar 1 10 0.7 1.0 -line on -fw 0.18 -fh 0.195 -ft 7.2 -edge triangle'

endif

if( _sw = 'diff' )
  title1 = 'ISCCP Cloud Fraction Diff [%] for 'term
  title2 = '('_run._f2') - ('_run._f1')'
*  'color '_min' '_max' '_int' -kind brown->red->white->blue->purple -xcbar 1 10 0.7 1.0 -fstep 4 -line on'
*  'color '_min' '_max' '_int' -kind brown->red->white->blue->purple -xcbar 1 10 0.7 1.0 -fs 5 -fo 1 -fw 0.18 -fh 0.195 -ft 7.2 -line on'

  'color '_min' '_max' '_int' -kind brown->red->white->blue->purple -xcbar 1 10 0.7 1.0 -line on -fw 0.18 -fh 0.195 -ft 7.2 -edge triangle'

endif



***************************************************************
* Calculate cloud fraction
***************************************************************
f = 1
while( f <= _fmax )
  say 'Processing #'f' : _type.'f' = '_type.f
  'set dfile '_f2df.f

************************ NICAM ****************************
  if( _type.f = 'nicam' )
    'set lat 'latmin' 'latmax
    'set lon 'lonmin' 'lonmax
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

            prex( 'temp = aave( maskout( a'f'z'z', prs'f'-'pb.j' ), lon='lonmin', lon='lonmax', lat='latmin', lat='latmax' )' )
            value.f.i.j = value.f.i.j + v2s( 'temp' )

            p = p + 1
          endwhile
          q = q + 1
        endwhile

*        color.f.i.j = v2c( value.f.i.j )
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

        'set lon 'lonmin' 'lonmax
        'set lat 'latmin' 'latmax

        if( _time_start.f != '' & _time_end.f != '' )
          prex( 'var'f'i'i'j'j' = ave( 'var.i.j', time='_time_start.f', time='_time_end.f' )' )
        else
          prex( 'clave 'var.i.j' '_clim_arg.f' var'f'i'i'j'j )
        endif
        'var'f'i'i'j'j' = maskout(var'f'i'i'j'j',mask'f'(t=1)-0.5)'

        'set x 1' ; 'set y 1'
        'temp = aave( maskout(var'f'i'i'j'j',mask'f'(t=1)-0.5), lon='lonmin', lon='lonmax', lat='latmin', lat='latmax' )'

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
    vymin = 2.6 * (j-1)
    vymax = vymin + 3.5
    'set vpage 'vxmin' 'vxmax' 'vymin' 'vymax
  endif

  f1 = subwrd( _disp.d, 1 )
  f2 = subwrd( _disp.d, 2 )

  if( f1 = '' ) ; d = d + 1 ; continue ;  endif

  j = 1
  while( j <= jmax )
    i = 1
    while( i <= imax )

      posx = 1 + boxwidth * i
      posy = 8 - boxheight * j
      if( f2 = '' )
        if( value.f1.i.j < 0 ) ; i = i + 1 ; continue ; endif
        value = value.f1.i.j
      else
        if( value.f1.i.j < 0 | value.f2.i.j < 0 ) ; i = i + 1 ; continue ; endif
        value = value.f2.i.j - value.f1.i.j
      endif
      
      color = v2c( value )

      'set line 'color
      'draw recf 'posx' 'posy-boxheight' 'posx+boxwidth' 'posy

      'setfont 'font1' -base c'
*    'set string 3'
      'set string 1'
      sign = '' ; if( value > 0 & sw = 'diff' ) ; sign = '+' ; endif
      'draw string 'posx+boxwidth/2' 'posy-boxheight/2' 'sign%math_format('%.2f',value )

      i = i + 1
    endwhile
    j = j + 1
  endwhile


  d = d + 1
endwhile





* vertical
'set line 1'
if( type = '7x7' ) ; 'draw line 2.0 1.6 2.0 'ymax ; endif
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

return

* below old

********************* draw *******************************
if( _type = '7x7' )
  boxwidth  = 1.0
  boxheight = 0.8
*  font1 = 'small'
*  font2 = 'normal'
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

* draw
j = 1
while( j <= jmax )
  i = 1
  while( i <= imax )

    posx = 1 + boxwidth * i
    posy = 8 - boxheight * j
    if( _sw = 'raw' )
      if( value._f1.i.j < 0 ) ; i = i + 1 ; continue ; endif
      value = value._f1.i.j
    endif
    if( _sw = 'diff' )
      if( value._f1.i.j < 0 | value._f2.i.j < 0 ) ; i = i + 1 ; continue ; endif
      value = value._f2.i.j - value._f1.i.j
    endif
    
    color = v2c( value )

    'set line 'color
    'draw recf 'posx' 'posy-boxheight' 'posx+boxwidth' 'posy

    'setfont 'font1' -base c'
*    'set string 3'
    'set string 1'
    sign = '' ; if( value > 0 & sw = 'diff' ) ; sign = '+' ; endif
    'draw string 'posx+boxwidth/2' 'posy-boxheight/2' 'sign%math_format('%.2f',value )

    i = i + 1
  endwhile
  j = j + 1
endwhile



* vertical
'set line 1'
if( type = '7x7' ) ; 'draw line 2.0 1.6 2.0 'ymax ; endif
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

return



function v2c( value )
  cn = -1
  if( value < _min ) ; cn = 16; endif
  curv = _min
  curc = 17
  
  while( curv + _int <= _max )
    if( curv <= value & value < curv + _int )
      cn = curc
      break
    endif
    curv = curv + _int
    curc = curc + 1
  endwhile

  if( value > _max ) ; cn = curc; endif
  
return cn


function v2s( var )
  'd 'var
  value = subwrd( result, 4 )
return value
