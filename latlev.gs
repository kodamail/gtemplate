*
* prepare cnf_latlon.gsf in the same directory, cnf/ or cnf_sample/.
*
function latlev( args )
  'reinit'
  rc = gsfallow("on")

*----- set frame (depends on frame size ... TODO)
  'set line 0'
  'draw rec 0 0 11 8.5'

*----- set cnf by loading cnf_latlev.gsf
  set_cnf()

*----- calculate aspect ratio for vector
  'q gxinfo'
  line = sublin( result, 3 )
  xmin = subwrd( line, 4 )
  xmax = subwrd( line, 6 )
  xw = xmax - xmin
  line = sublin( result, 4 )
  ymin = subwrd( line, 4 )
  ymax = subwrd( line, 6 )
  yw = ymax - ymin
* in [km]
  latw = ( _latmax - _latmin ) * 111
  if( _vert = 'pressure' )
    levw = ( 16 * math_log10(_levmin/_levmax) )
  else
    levw = ( _levmax - _levmin ) / 1000
  endif
  ratio = (yw / levw) / (xw / latw)
  my = 1
  mz = ratio


  set_time()


*----- Variable List
  f = 1
  while( f <= _fmax )
    if( _varid.f = '_varid.'f | _varid.f = '' ) ; _varid.f = _varid ; endif
    say f % ': ' % _varid.f
    get_varcnf( f, _varid.f, _varcnfid )
    f = f + 1
  endwhile

***************************************************************
* Legend
***************************************************************
*'setfont tiny -base l'
**'draw string 0.1 0.25 file : 'gs
** horizontal style
*if( _fmax > 3 )
*  f = 1
*  while( f <= _fmax )
*    if( f > 6 ) ; break ; endif
*    i = f
*    j = 2
*    if( i >= 4 ) ; i = i - 3 ; j = j - 1 ; endif
*    xpos = 3.8 * i - 3.7
*    ypos = 0.15 * j - 0.05
*    'draw string 'xpos' 'ypos' '_time_start.f' <= '_run.f' <= '_time_end.f
*    f = f + 1 
*  endwhile
*endif
** vertical style
*if( _fmax <= 3 )
*  f = 1
*  while( f <= _fmax )
*    xpos = 0.1
*    ypos = 0.15 * (_fmax-f+1) - 0.05
*    'draw string 'xpos' 'ypos' '_time_start.f' <= '_run.f' <= '_time_end.f
*    f = f + 1 
*  endwhile
*endif  'set line 0'
  'draw rec 0 0 11 8.5'


***************************************************************
* Calculate
***************************************************************
f = 1
while( f <= _fmax )
*  say 'Processing #'f
  'set dfile '_f2df.f
  'set x 1'
  'set lat '_latmin' '_latmax
  'set lev '_levmin' '_levmax
  'set t 1'

  xdef = qctlinfo( f, 'xdef', 1 )
  ydef = qctlinfo( f, 'ydef', 1 )
  zdef = qctlinfo( f, 'zdef', 1 )
  tdef = qctlinfo( f, 'tdef', 1 )

*  say 'xdef='xdef
  if( xdef > 1 )
    _var.f = 'ave(' % _var.f % ',x=1,x=' % xdef % ')'
  endif

* data is climatology
  if( _climvar.f = 1 )
    say 'f = ' % f % ' data is climatological'
    'set x 1 'xdef
    'set y 1 'ydef
    'set z 1 'zdef
    'set t 1 'tdef
    'v'f'tmp = '_var.f
    _var.f = 'v'f'tmp'
    'modify v'f'tmp seasonal'
  endif


  'set x 1'
  'set y 1 'ydef
  'set z 1 'zdef
  'set t 1'
  if( _time_start.f != '' & _time_end.f != '' )
    prex( 'v'f' = ave( '_var.f', time='_time_start.f', time='_time_end.f' )' )

    if( _vary.f != '' & _vary.f != '_vary.'f )
      prex( 'vy'f' = ave( '_vary.f', time='_time_start.f', time='_time_end.f' )' )
    endif
    if( _varz.f != '' & _varz.f != '_varz.'f )
      prex( 'vz'f' = ave( '_varz.f', time='_time_start.f', time='_time_end.f' )' )
    endif
  endif

  if( _clim_arg.f != '' )
    prex( 'clave '_var.f' '_clim_arg.f' v'f )

    if( _vary.f != '' & _vary.f != '_vary.'f )
      prex( 'clave '_vary.f' '_clim_arg.f' vy'f )
    endif

    if( _varz.f != '' & _varz.f != '_varz.'f )
      prex( 'clave '_varz.f' '_clim_arg.f' vz'f )
    endif
  endif

  f = f + 1
endwhile


***************************************************************
* Draw
***************************************************************
if( _vert = 'pressure' )
  'set zlog on'
  'set imprun loglabel'
endif


d = 1
while( d <= 6 )
  i = d
  j = 2
  if( i >= 4 ) ; i = i - 3 ; j = j - 1 ; endif

  'mul 3 2 'i' 'j' -xoffset 'i*0.1-0.3
*  'mul 3 5 'i' 'j+2' -xoffset 'i*0.1-0.3
  'set grads off'

  f1 = subwrd( _disp.d, 1 )
  f2 = subwrd( _disp.d, 2 )

  if( f1 = '' ) ; d = d + 1 ; continue ;  endif

***** raw data *****
  if( f2 = '' )
    'set dfile 'f1
    'set lev '_levmin' '_levmax
    'set lat '_latmin' '_latmax
    'set lon 0'
    'set t 1'

    if( _shade.d = 'on' )
*      'color '_color.f1

* TODO: color or colork
      'color '_min.f1' '_max.f1' '_int.f1' -gxout shaded -kind '_colork.f1
      'd v'f1

*   for calculating minimum value of mass streamfunction
*    'set x 1'
*    'set y 1'
*    'set z 1'
*    'd min(min( v'f1', lev='_levmin', lev='_levmax' ), lat='_latmin', lat='_latmax')'
*    p = 1
*    while( p < 100000 )
*      line = sublin( result, p )
*      key = subwrd( line, 1 )
*      if( key = 'Result' )
*        value = subwrd( line, 4 )
*        break
*      endif
*      p = p + 1
*    endwhile
*    say 'min = ' % value
**    '!sleep 10s'
*    'set lev '_levmin' '_levmax
*    'set lat '_latmin' '_latmax
*    'set lon 0'
*    'set t 1'

      xpos = 3.5 * i - 2.7
      ypos = 4.0 * j - 3.5
*      'xcbar 'xpos' 'xpos+3.0' 'ypos' 'ypos+0.15' -line on -fstep 2 -foffset 1 -fwidth 0.08 -fheight 0.08'
      'xcbar 'xpos' 'xpos+3.0' 'ypos' 'ypos+0.15' '_xcbar_arg
    endif

    if( _cont.d = 'on' )
      'set gxout contour'

      if( _varid = 'mim_st' )
        'set cint '_int;  'set cthick 6'; 'set ccolor 1'
        'd maskout( v'f1', -(lev-'_levmin')*(lev-'_levmin'/10) )'

*        'set cint '_int/10;  'set cthick 6'; 'set ccolor 1'
*        'd maskout( v'f1', -(lev-'_levmin'/10)*(lev-'_levmin'/100) )'

*        'set cint '_int/100;  'set cthick 6'; 'set ccolor 1'
*        'd maskout( v'f1', -(lev-'_levmin'/100)*(lev-'_levmin'/1000) )'

*        'set cint '_int/1000;  'set cthick 6'; 'set ccolor 1'
*        'd maskout( v'f1', -(lev-'_levmin'/1000)*(lev-'_levmin'/10000) )'

*        'set cint '_int/10000;  'set cthick 6'; 'set ccolor 1'
*        'd maskout( v'f1', -(lev-'_levmin'/10000)*(lev-'_levmin'/100000) )'

      else
        'set cint '_int.f1;  'set cthick 6'; 'set ccolor 1'
        'd v'f1
      endif

    endif


    if( _vec.d = 'on' )

      if( _varid = 'mim_divf' | _varid = 'tem_divf' )
*      density on/off
*      'set arrowhead 0.05'
*      'set arrlab off'
*      base=5e+4
*      'set arrscl 1 'base ; 'set cthick 4'; 'set ccolor 3'
*      'd skip( maskout(epy'f1'/(lev*100),-(lev-1000)*(lev-500.1))*'my', 5, 2); epz'f1'/(lev*100) * 'mz
*      'set arrscl 1 'base ; 'set cthick 4'; 'set ccolor 3'
*      'd skip( maskout(epy'f1'/(lev*100),-(lev-500)*(lev-100.1))*'my', 5, 1); epz'f1'/(lev*100) * 'mz
*      'set arrscl 1 'base ; 'set cthick 4'; 'set ccolor 3'
*      'd skip( maskout(epy'f1'/(lev*100),-(lev-100)*(lev-0))*'my', 5, 1); epz'f1'/(lev*100) * 'mz

        'set arrowhead 0.05'
        'set arrlab off'
        'vy = vy'f1'*'my
        'vz = vz'f1'*'mz
        'vm = sqrt(vy*vy+vz*vz)'

        base = 3e+8
**        'set arrscl 0.5 'base ; 'set cthick 1'; 'set ccolor 14'
        'set arrscl 0.5 'base ; 'set cthick 6'; 'set ccolor 15'
*        'set arrscl 0.5 'base ; 'set cthick 10'; 'set ccolor 1'
*        'd skip( maskout( maskout( vy, (vm-3e+7) ),-(lev-'_levmin')*(lev-'_levmax')), '_sy.f1', '_sz.f1'); vz'
        'd skip( maskout( maskout( vy, -(vm-3e+7)*(vm-3e+8) ),-(lev-10000)*(lev-'_levmax')), '_sy.f1', '_sz.f1'); vz'
        if( d = 1 )
          'set line 15 1 6' ; 'arrow 0.6 0.2 1.1 0.2'
          'set string 1 l' ;  'draw string 1.15 0.2 'base
        endif

        base = 3e+7
        'set arrscl 0.5 'base ; 'set cthick 6'; 'set ccolor 1'
*        'd skip( maskout( maskout( vy, -(vm-3e+6)*(vm-3e+7) ),-(lev-'_levmin')*(lev-'_levmax')), '_sy.f1', '_sz.f1'); vz'
        'd skip( maskout( maskout( vy, -(vm-3e+6)*(vm-3e+7) ),-(lev-10000)*(lev-'_levmax')), '_sy.f1', '_sz.f1'); vz'
        if( d = 1 )
          'set line 1 1 6' ; 'arrow 1.6 0.2 2.1 0.2'
          'set string 1 l' ;  'draw string 2.15 0.2 'base
        endif

        base = 3e+6
        'set arrscl 0.51 'base ; 'set cthick 2'; 'set ccolor 1'
*        'd skip( maskout( maskout( vy, -(vm-3e+6) ),-(lev-'_levmin')*(lev-'_levmax')), '_sy.f1', '_sz.f1'); vz'
        'd skip( maskout( maskout( vy, -(vm-3e+6) ),-(lev-10000)*(lev-'_levmax')), '_sy.f1', '_sz.f1'); vz'
        if( d = 1 )
          'set line 1 1 2' ; 'arrow 2.6 0.2 3.1 0.2'
          'set string 1 l' ;  'draw string 3.15 0.2 'base
        endif

      endif
    endif

    'setfont small'
    if( _title.f1 = '' | _title.f1 =  '_title.'f1 )
      'draws ('_run.f1')'
    else
      'draws ('_title.f1')'
    endif

***** diff data *****
  else
    'set dfile 'f2
    'set lev '_levmin' '_levmax
    'set lat '_latmin' '_latmax
    'set lon 0'
    'set t 1'

    diff( 'v'f2, f2, 'v'f1, f1, 'd' )

    if( _shade.d = 'on' )
*      'color '_dmin.f1' '_dmax.f1' '_dint.f1' -kind '_dcolor.f1

      'color '_dmin.f1' '_dmax.f1' '_dint.f1' -gxout shaded -kind '_dcolork.f1
*      'color '_dcolor.f1
      'd d'

      xpos = 3.5 * i - 2.7
      ypos = 4.0 * j - 3.5
*      'xcbar 'xpos' 'xpos+3.0' 'ypos' 'ypos+0.15' -line on -fstep 2 -foffset 1 -fwidth 0.08 -fheight 0.08'
      'xcbar 'xpos' 'xpos+3.0' 'ypos' 'ypos+0.15' '_xcbar_arg
    endif

    if( _cont.d = 'on' )
      'set gxout contour'; 'set cint '_dint.f1;  'set cthick 6'; 'set ccolor 1'
      'd d'
    endif

    if( _vec.d = 'on' )

      diff( 'vy'f2, f2, 'vy'f1, f1, 'dy' )
      diff( 'vz'f2, f2, 'vz'f1, f1, 'dz' )

      if( _varid = 'mim_divf' | _varid = 'tem_divf' )

        'set arrowhead 0.05'
        'set arrlab off'
        'dvy = dy*'my
        'dvz = dz*'mz
        'dvm = sqrt(dvy*dvy+dvz*dvz)'

        base = 1e+8
        'set arrscl 0.5 'base ; 'set cthick 6'; 'set ccolor 15'
        'd skip( maskout( maskout( dvy, -(dvm-1e+7)*(dvm-1e+8) ),-(lev-10000)*(lev-'_levmax')), '_sy.f2', '_sz.f2'); dvz'
        if( d = 5 )
          'set line 15 1 6' ; 'arrow 0.6 0.1 1.1 0.1'
          'set string 1 l' ;  'draw string 1.15 0.1 'base
        endif

        base = 1e+7
        'set arrscl 0.5 'base ; 'set cthick 6'; 'set ccolor 1'
        'd skip( maskout( maskout( dvy, -(dvm-1e+6)*(dvm-1e+7) ),-(lev-10000)*(lev-'_levmax')), '_sy.f2', '_sz.f2'); dvz'
        if( d = 5 )
          'set line 1 1 6' ; 'arrow 1.6 0.1 2.1 0.1'
          'set string 1 l' ;  'draw string 2.15 0.1 'base
        endif

        base = 1e+6
        'set arrscl 0.51 'base ; 'set cthick 2'; 'set ccolor 1'
        'd skip( maskout( maskout( dvy, -(dvm-1e+6) ),-(lev-10000)*(lev-'_levmax')), '_sy.f2', '_sz.f2'); dvz'
        if( d = 5 )
          'set line 1 1 2' ; 'arrow 2.6 0.1 3.1 0.1'
          'set string 1 l' ;  'draw string 3.15 0.1 'base
        endif

      endif

    endif


    'setfont small'
    'draws ('_run.f1') - ('_run.f2')'

  endif

  if( valnum(_over.d) = 1 )
*    'set gxout contour'; 'set cint '_int;  'set cthick 2'; 'set ccolor 3'
    'set gxout contour'; 'set cint '_int.f1;  'set cthick 6'; 'set ccolor 1'
    'set clab on'
    of = _over.d
    'd v'of
    'set clab on'
  endif


  if( d = 1 )
    'setfont small'
    'draws -xoffset -0.5 -yoffset 0.25 -pos tl '_name.f1' for 'term' '_year' ['_unit.f1']'
  endif

  d = d + 1
endwhile


*m2 = _month
*if( _month < 10 ) ; m2 = '0' % m2 ; endif
*'_save lat_lev_' % var % '_' % m2
*'_save 'save

if( _save != '_save' & _save != '' )
*  'save '_save
  'gxprint '_save'.eps white'
endif

exit
***************************************************************
***************************************************************

*
* d = v2 - v1
*
function diff( v1, df1, v2, df2, d )
  'set dfile 'df1
  z1max = qctlinfo( df1, zdef, 1 )
  z2max = qctlinfo( df2, zdef, 1 )
*say z1max
*say z2max
  'set z 1 'z1max
*  'd = const( 'v1', 0, -a )'
  'd = const( 'v1', 0 )'
  z1 = 1

  while( z1 <= z1max )
*    say z1
    'set z 'z1
    lev1 = qdims( levmin )

***** determine z2 which satisfies lev(z2) <= lev(z1) <= lev(z2+1)
    'set dfile 'df2
    z2 = 1
    while( z2 <= z2max-1 )
      'set z 'z2
      lev2min = qdims( levmin )
      'set z 'z2+1
      lev2max = qdims( levmin )

      if( ( lev2min <= lev1 & lev1 <= lev2max ) | ( lev2max <= lev1 & lev1 <= lev2min ) ) ; break ; endif
*      if( z2 = z2max-1 ) ; z2 = -1 ; endif
      z2 = z2 + 1
    endwhile
*    say ' -> 'z2

***** linear interpolation or fill undef
    'set dfile 'df1
    'set z 'z1
*    'set z 1 'z1max
    if( z2 < z2max )
      w = ( lev1 - lev2min ) / ( lev2max - lev2min )
      'tmp = lterp( 'w' * 'v2'(z='z2+1') + (1-'w') * 'v2'(z='z2'), 'v1' ) - 'v1
*      say v2
    else
*      say 'undef: 'lev1
      'tmp = maskout( 'v1', 'v1'*0-1 )'
    endif

***** set value for d
*    lev1min = lev1 - 1e-4
*    lev1max = lev1 + 1e-4
    lev1min = lev1 - ( lev2max - lev2min ) * 0.1
    lev1max = lev1 + ( lev2max - lev2min ) * 0.1
    'set z 1 'z1max
    d' = 'd' + const( maskout( tmp, -(lev-'lev1min')*(lev-'lev1max') ), 0, -u )'

*    'd const( maskout( tmp, -(lev-'lev1min')*(lev-'lev1max') ), 0, -u )'
*    say v1
*    say v2
*    if( z1 = 6 )
*      say lev1
*      say lev1min
*      say lev1max
*      exit
*    endif

    z1 = z1 + 1
  endwhile


  'set lev '_levmin' '_levmax
return





*
* varid, varcnfid -> name, unit, min, ...
*
function get_varcnf( f, varid, varcnfid )

  if( varid = 'u' )
    name = 'Zonal Wind'
    unit = 'm/s'
    min  = -50  ; int = 10 ; max = 50
    dmin = -25 ; dint = 5 ; dmax = 25
    colork = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolork = 'bluered'
    if( varcnfid = '2' )
      dmin = -10 ; dint = 2 ; dmax = 10
    endif
  endif

  if( varid = 'v' )
    name = 'Meridional Wind'
    unit = 'm/s'
    min  = -5  ; int = 1   ; max = 5
    dmin = -1 ; dint = 0.2 ; dmax = 1
    colork = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolork = 'bluered'
  endif

  if( varid = 'w' )
    name = 'Vertical Velocity'
    unit = 'mm/s'
    min  = -10  ; int = 1 ; max = 10
    dmin = -5 ; dint = 0.5 ; dmax = 5
    colork = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolork = 'bluered'
  endif

  if( varid = 't' )
    name = 'Temperature'
    unit = 'K'
    min  = 190 ; int  = 10 ; max  = 290
    dmin = -10 ; dint = 1  ; dmax = 10
    colork  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolork = 'purple->bluered->maroon'
*    dcolork = 'bluered'
  endif

  if( varid = 'qv' )
    name = 'Specific Humidity'
    unit = 'g/kg'
    min  = 2  ; int  = 2   ; max  = 20
    dmin = -2 ; dint = 0.4 ; dmax = 2
    colork = 'white-(0)->grainbow'
    dcolork = 'blue->aqua->white->red->maroon'
*    colork = 'white->aqua->blue->purple'
*    dcolork = 'maroon->red->white->aqua->blue'
  endif

  if( varid = 'rh' )
    name = 'Relative Humidity'
    unit = '%'
    min  = 10  ; int  = 10 ; max  = 100
    dmin = -20 ; dint = 4  ; dmax = 20
    colork  = 'white-(0)->grainbow'
    dcolork = 'blue->aqua->white->red->maroon'
*    colork  = 'white->aqua->blue->purple'
*    dcolork = 'maroon->red->white->aqua->blue'
  endif

  if( varid = 'qc' | varid = 'qi' | varid = 'qr' | varid = 'qs' | varid = 'qg' )
    if( varid = 'qc' ) ;  name = 'Cloud Water' ; endif
    if( varid = 'qi' ) ;  name = 'Cloud Ice'   ; endif
    if( varid = 'qr' ) ;  name = 'Rain'        ; endif
    if( varid = 'qs' ) ;  name = 'Snow'        ; endif
    if( varid = 'qg' ) ;  name = 'Graupel'     ; endif
    unit = '10`a-6`n kg/kg'
    min  = 3   ; int  = 3 ; max  = 18
    dmin = -10 ; dint = 2 ; dmax = 10
    colork = 'white-(0)->grainbow'
    dcolork = 'maroon->red->white->aqua->blue'
*  colork = 'white->aqua->blue->purple'
  endif

  if( varid = 'temp' )
    name = 'Terminal Velocity'
    unit = 'm/s'
    min  = 0.05 ; int  = 0.05 ; max  = 0.5
    dmin = -10  ; dint = 2    ; dmax = 10
    colork  = 'white->aqua->blue->purple'
    dcolork = 'maroon->red->white->aqua->blue'
  endif

  if( varid = 'n2' )
    name = 'Static Stability N`a2`n'
    unit = '10`a-4`n /s`a2`n'
    min  = 1    ; int  = 5   ; max  = 0.5
    dmin = -0.5 ; dint = 0.1 ; dmax = 0.5
    colork  = 'white->aqua->blue->purple'
    dcolork = 'maroon->red->white->aqua->blue'
  endif

  if( varid = 'mim_u' )
    name = 'MIM Zonal Wind'
    unit = 'm/s'
    min  = -50 ; int  = 10 ; max  = 50
    dmin = -10 ; dint = 2  ; dmax = 10
    colork  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolork = 'bluered'
  endif

  if( varid = 'mim_st' )
    name = 'MIM Streamfunction'
    unit = '10`a10`n kg/s'
*    min  = -24  ; int = 3 ; max = 24
    min  = -24  ; int = 4 ; max = 24
*    dmin = -5 ; dint = 1 ; dmax = 5
    dmin = -3 ; dint = 0.5 ; dmax = 3
    if( _levmin <= 100 )
      min  = -2.4 ; int  = 0.4 ; max  = 2.4
      dmin = -0.5 ; dint = 0.1 ; dmax = 0.5
    endif
*    colork = 'purple->blue->aqua->lime->yellow->red->maroon'
    colork  = 'purple->bluered->maroon'
    dcolork = 'bluered'
  endif

  if( varid = 'mim_divf' | varid = 'tem_divf' )
    if( varid = 'mim_divf' ) ; name = 'MIM EP Flux / Divergence' ; endif
    if( varid = 'tem_divf' ) ; name = 'TEM EP Flux / Divergence' ; endif
    unit = 'm/(s day)'
*    colork = '-levs -20 -10 -4 -2 -1 0 1 2 4 10 20 -kind bluered'
    colork = '-levs -100 -50 -20 -10 -4 -2 -1 0 1 2 4 10 20 50 100 -kind purple->bluered->maroon'
    dcolork = '-levs -50 -25 -10 -5 -2 -1 -0.5 0 0.5 1 2 5 10 25 50 -kind purple->bluered->maroon'
endif


* set default varcnf to global varcnf 
  if(    _name.f =    '_name.'f ) ;    _name.f =    name ; endif
  if(    _unit.f =    '_unit.'f ) ;    _unit.f =    unit ; endif
  if(     _min.f =     '_min.'f ) ;     _min.f =     min ; endif
  if(     _int.f =     '_int.'f ) ;     _int.f =     int ; endif
  if(     _max.f =     '_max.'f ) ;     _max.f =     max ; endif
  if(    _dmin.f =    '_dmin.'f ) ;    _dmin.f =    dmin ; endif
  if(    _dint.f =    '_dint.'f ) ;    _dint.f =    dint ; endif
  if(    _dmax.f =    '_dmax.'f ) ;    _dmax.f =    dmax ; endif
  if(   _color.f =   '_color.'f ) ;   _color.f =   color ; endif
  if(  _dcolor.f =  '_dcolor.'f ) ;  _dcolor.f =  dcolor ; endif
  if(  _colork.f =  '_colork.'f ) ;  _colork.f =  colork ; endif
  if( _dcolork.f = '_dcolork.'f ) ; _dcolork.f = dcolork ; endif

return


function set_cnf()

* set default values
  _varid      = ''
  _cbar       = 'hor'
  _cbar.1     = '1'
  _cbar.2     = ''
  _shade      = 'on'
  _cont       = 'off'
  _vec        = 'off'
*  _vec        = 'on'
  _time_start = ''
  _time_end   = ''
  _year       = 2004
  _month      = 6
  _year_start = ''
  _year_end   = ''
  _latmin     = -90
  _latmax     = 90
  _vert       = 'pressure'
  _levmin     = 1000
  _levmax     = 10
  _xcbar_arg  = '-line on -fstep 2 -foffset 1 -fwidth 0.08 -fheight 0.08'
  _fmax       = 0
  _save       = ''
  i = 1
  while( i <= 6 )
    _disp.i  = ''
    _shade.i = ''
    _cont.i  = ''
    _vec.i   = ''
    _over.i  = ''
    i = i + 1
  endwhile

*----- load cnf_latlon.gsf
  rc = gsfpath( 'cnf cnf_sample' )
  ret = cnf_latlev()

** check existence of cnf file
*  ret = read( cnf'.gsf' )
*  stat = sublin( ret, 1 )
*  if( stat != 0 )
*    ret = read( cnf )
*    stat = sublin( ret, 1 )
*    if( stat != 0 )
*      say 'error: 'cnf'.gsf does not exist'
*      exit
*    else
*      cnf = substr( cnf, 1, math_strlen(cnf)-4 )
*    endif
*  endif
*
** check multiple-execution
*  ret = read( 'inc_latlev.gsf' )
*  stat = sublin( ret, 1 )
*  if( stat = 0 )
*    say 'error: temporal file inc_latlev.gsf exists. Please remove.'
*    say '(illegal multiple execution may occur)'
*    exit
*  endif
*
** load cnf
*  ret = write( 'inc_latlev.gsf', 'function inc_latlev()' )
*  ret = write( 'inc_latlev.gsf', 'ret = 'cnf'()' )
*  ret = write( 'inc_latlev.gsf', 'return ret' )
*  ret = close( 'inc_latlev.gsf' )
*  ret = inc_latlev()
*  '!rm inc_latlev.gsf'

* set default and/or necessary values necessary after loading cnf
  i = 1
  while( i <= 6 )
    if( _shade.i = '' ) ; _shade.i = _shade ; endif
    if( _cont.i  = '' ) ; _cont.i  = _cont  ; endif
    if( _vec.i   = '' ) ; _vec.i   = _vec   ; endif
    i = i + 1
  endwhile

  f = 1
  while( f <= _fmax )
    if( (    _name != '' &    _name !=    '_name' ) & (    _name.f = '' |    _name.f =    '_name.'f ) ) ;    _name.f =    _name ; endif
    if( (    _unit != '' &    _unit !=    '_unit' ) & (    _unit.f = '' |    _unit.f =    '_unit.'f ) ) ;    _unit.f =    _unit ; endif
    if( (     _min != '' &     _min !=     '_min' ) & (     _min.f = '' |     _min.f =     '_min.'f ) ) ;     _min.f =     _min ; endif
    if( (     _int != '' &     _int !=     '_int' ) & (     _int.f = '' |     _int.f =     '_int.'f ) ) ;     _int.f =     _int ; endif
    if( (     _max != '' &     _max !=     '_max' ) & (     _max.f = '' |     _max.f =     '_max.'f ) ) ;     _max.f =     _max ; endif
    if( (    _dmin != '' &    _dmin !=    '_dmin' ) & (    _dmin.f = '' |    _dmin.f =    '_dmin.'f ) ) ;    _dmin.f =    _dmin ; endif
    if( (    _dint != '' &    _dint !=    '_dint' ) & (    _dint.f = '' |    _dint.f =    '_dint.'f ) ) ;    _dint.f =    _dint ; endif
    if( (    _dmax != '' &    _dmax !=    '_dmax' ) & (    _dmax.f = '' |    _dmax.f =    '_dmax.'f ) ) ;    _dmax.f =    _dmax ; endif
    if( (   _color != '' &   _color !=   '_color' ) & (   _color.f = '' |   _color.f =   '_color.'f ) ) ;   _color.f =   _color ; endif
    if( (  _dcolor != '' &  _dcolor !=  '_dcolor' ) & (  _dcolor.f = '' |  _dcolor.f =  '_dcolor.'f ) ) ;  _dcolor.f =  _dcolor ; endif
    if( (  _colork != '' &  _colork !=  '_colork' ) & (  _colork.f = '' |  _colork.f =  '_colork.'f ) ) ;  _colork.f =  _colork ; endif
    if( ( _dcolork != '' & _dcolork != '_dcolork' ) & ( _dcolork.f = '' | _dcolork.f = '_dcolork.'f ) ) ; _dcolork.f = _dcolork ; endif

    f = f + 1
  endwhile

  say ''


return
