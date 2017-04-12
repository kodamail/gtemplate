*
* prepare cnf_latlon.gsf in the same directory, cnf/ or cnf_sample/.
*
* TODO
* -support mask for ISCCP topography
*
function latlon( args )
  'reinit'
  rc = gsfallow( 'on' )

*----- set frame (depends on frame size ... TODO)
  'set line 0'
  'draw rec 0 0 11 8.5'

*----- set cnf by loading cnf_latlon.gsf
  set_cnf()


  set_region()
  set_time()

*----- Variable List
  f = 1
  while( f <= _fmax )
    if( _varid.f = '_varid.'f | _varid.f = '' ) ; _varid.f = _varid ; endif
    say f % ': ' % _varid.f
*    _sname.f = ''

* varid, varcnf -> name, unit, min, ...
* 1. call get_varcnf without varcnfid (default varcnf will be set)
* 2. load cnf
* 3. call get_varcnf again if varcnfid is set in cnf.

    get_varcnf( f, _varid.f, _varcnfid )

    f = f + 1
  endwhile


* TODO: detailed description such as the below should be output to txt file if specified.
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
**    'draw string 'xpos' 'ypos' '_time_start.f' <= '_run.f' <= '_time_end.f
*    f = f + 1 
*  endwhile
*endif


***************************************************************
* Calculate
***************************************************************
  f = 1
  while( f <= _fmax )
*    say 'Processing #'f
    'set dfile '_f2df.f
    'set lat '_latmin' '_latmax
    'set lon '_lonmin' '_lonmax
    'set z 1'
    'set t 1'
    if( _time_start.f != '' & _time_end.f != '' )
      prex( 'v'f' = ave( '_var.f', time='_time_start.f', time='_time_end.f' )' )
    endif
    if( _clim_arg.f != '' )
      prex( 'clave '_var.f' '_clim_arg.f' v'f )
    endif
    f = f + 1
  endwhile


***************************************************************
* Draw
***************************************************************
  first = 1
  d = 1
  while( d <= 6 )
    i = 1
    j = 4-d
    if( j <= 0 ) ; i = 2 ; j = j + 3 ; endif

*    xo = -0.2 ; yo = 0.1
*    xwid = ''
*    'mul 2 3 'i' 'j' -xoffset 'xo' -yoffset 'yo' 'xwid

    xo = -0.2 ; yo = -0.15
    xwid = '' ; yint = '-yint 0.62'
    'mul 2 3 'i' 'j' -xoffset 'xo' -yoffset 'yo' 'xwid' 'yint

    'set grads off'
    'set mpdraw '_mpdraw

    f1 = subwrd( _disp.d, 1 )
    f2 = subwrd( _disp.d, 2 )

    if( f1 = '' ) ; d = d + 1 ; continue ;  endif
    'set dfile '_f2df.f1
    'set z 1'

    'shade const(v'f1',0,-u) -1e+30 1e+30 150 150 150'

***** raw data *****
    if( f2 = '' )
      'color -gxout shaded -kind '_color.f1' '_min2d.f1' '_max2d.f1' '_int2d.f1
      'v = v'f1
    else
      'color -gxout shaded -kind '_dcolor.f1' '_dmin2d.f1' '_dmax2d.f1' '_dint2d.f1
      'v = v'f1' - lterp( v'f2', v'f1' )'
    endif

    'd v'
    if( _cbar.d = 'hor' )
      if( d <= 3 ) ; xposmin = 1.4
      else         ; xposmin = 6.4 ; endif
      xposmax = xposmin + 4.3
*      yposmin = 0.4 + (j-1) * 2.5
      yposmin = 0.2 + (j-1) * 2.5
*      yposmax = yposmin + 0.2
      yposmax = yposmin + 0.15
      'q shades'
      if( sublin(result,1) != 'None' )
*        'xcbar 'xposmin' 'xposmax' 'yposmin' 'yposmax' -edge triangle -line on -fstep 2'
        'xcbar 'xposmin' 'xposmax' 'yposmin' 'yposmax' -edge triangle -line on -fstep 2 -fw 0.10 -fh 0.10 -ft 4'
      endif
    endif

    'set gxout contour'
    'set clab off'
    'set cthick 1'
    'set ccolor 1'
    if( f2 = '' )
      'set cmin '_max2d.f1+_int2d.f1
      'set cint '_int2d.f1
    else
      'set cmin '_dmax2d.f1+_dint2d.f1
      'set cint '_dint2d.f1
    endif
    'd v'
    'set cthick 1'
    if( f2 = '' )
      'set cmin '_max2d.f1+_int2d.f1
      'set cint '_int2d.f1
    else
      'set cmin '_dmax2d.f1+_dint2d.f1
      'set cint '_dint2d.f1
    endif
    'd v'

    if( _cont.d = 'on' )
        'set clab on'
        'set gxout contour'; 'set cthick 6'; 'set ccolor 1'
      if( f2 = '' )
        'set cint '_int2d.f1
      else
        'set cint '_dint2d.f1
      endif
      'd v'
    endif

    ymonit = 0
    if( _monit.d = 'bias' )
      ymonit = 0.062
      prex( 'bias = aave( v, lon='_lonmin', lon='_lonmax', lat='_latmin', lat='_latmax' )' )
      bias = v2s( 'bias' )
      bias = math_format( '%.2f', bias )
      prex( 'rmse = aave( sqrt((v)*(v)), lon='_lonmin', lon='_lonmax', lat='_latmin', lat='_latmax' )' )
      rmse = v2s( 'rmse' )
      rmse = math_format( '%.2f', rmse )
      prex( 'sc = scorr( v'f1', lterp( v'f2', v'f1' ), lon='_lonmin', lon='_lonmax', lat='_latmin', lat='_latmax' )' )
      sc = v2s( 'sc' )
      sc = math_format( '%.2f', sc )
      'set strsiz 0.08 0.08'
      'set string 1 c 3'
      'draws -pos tr -base r -color 14 -yoffset -0.027 bias='bias', rmse='rmse', scorr='sc
    endif

*    'setfont small'
*    if( f2 = '' ) ; 'draws ('_run.f1')' % _sname.f1
*    else ; 'draws ('_run.f1') - ('_run.f2')' % _sname.f1 ; endif

    'set strsiz 0.10 0.10'
    'set string 1 c 4.0'
    r30.1 = substr(_run.f1,1,30)
    if( r30.1 !=_run.f1 ) ; r30.1 = r30.1 % '...' ; endif
    r15.1 = substr(_run.f1,1,15)
    if( r15.1 !=_run.f1 ) ; r15.1 = r15.1 % '...' ; endif
    r15.2 = substr(_run.f2,1,15)
    if( r15.2 !=_run.f2 ) ; r15.2 = r15.2 % '...' ; endif
*    if( f2 = '' ) ; 'draws -yoffset 0.065 ('r30.1')' % _sname.f1
*    else ; 'draws -yoffset 0.065 ('r15.1') - ('r15.2')' % _sname.f1 ; endif
    if( f2 = '' ) ; 'draws -yoffset 'ymonit' ('r30.1')' % _sname.f1
    else ; 'draws -yoffset 'ymonit' ('r15.1') - ('r15.2')' % _sname.f1 ; endif


  if( first = 1 )
    first = 0
*    'setfont normal -base tl'
    'set strsiz 0.1 0.1'
    'set string 1 tl 4.0'
    'draw string 1.4 8.4 '_name.f1' for '_term' ['_unit.f1']'
  endif

*** zonal mean ***
    if( _region = '' | _region = 'global' | _region = '_region' )

*    xo = -0.2 ; yo = -0.15
*    xwid = '' ; yint = '-yint 0.62'


*      ypos = 2.5 * j - 1.6
      ypos = 2.62 * j - 1.72 - 0.25
      if( i = 1 ) ; 'set parea 4.8 5.8 'ypos' 'ypos+2.0 ; endif
      if( i = 2 ) ; 'set parea 9.8 10.8 'ypos' 'ypos+2.0 ; endif

      'set xyrev on'
      if( f2 = '' ) ; 'set vrange '_min1d.f1' '_max1d.f1 ; 'set xlint '_int1d.f1
      else ; 'set vrange '_dmin1d.f1' '_dmax1d.f1 ; 'set xlint '_dint1d.f1 ; endif
      'set ylab off'
      'set cmark 0' ; 'set cthick 6' ; 'set ccolor 1'
      'zm = ave( v, lon='_lonmin', lon='_lonmax', -b )'
      'd zm'
      'set ylab on'
    endif

*** global mean ***
   'gm = aave( v, lon='_lonmin', lon='_lonmax', lat='_latmin', lat='_latmax' )'
    gm = v2s( 'gm' )
*    'set strsiz 0.15 0.15'
*    'set string 1 c 6.0 270'
    if( _region = '' | _region = 'global' | _region = '_region' )
      'setfont normal -angle 270'
      'draws -pos tr -base tl -xoffset -0.1 -yoffset -0.5 -color 1 'math_format('%.2f',gm)
*      'draws -pos tr -base tl -xoffset -0.1 -yoffset -0.5 -color 14 'math_format('%.2f',gm)
      'setfont normal -angle 0'
    else
      'draws -pos tr -color 1 'math_format('%.2f',gm)
*      'draws -pos tr -color 14 'math_format('%.2f',gm)
    endif

    d = d + 1
  endwhile

  if( _save != '_save' & _save != '' )
*  'save '_save
    prex( 'gxprint '_save'.eps white' )
  endif

  exit
return

*
* d = v2 - v1
*
function diff( v1, df1, v2, df2, d )
  'set dfile 'df1
  'set z 1'
  d' = const( 'v1', 0, -a )'

  z1 = 1
  z1max = qctlinfo( df1, zdef, 1 )
  z2max = qctlinfo( df2, zdef, 1 )

  while( z1 <= z1max )
    'set z 'z1
    lev1 = qdims( levmin )

***** determine z2 which satisfies lev(z2) <= lev(z1) < lev(z2+1)
    'set dfile 'df2
    z2 = 1
    while( z2 <= z2max-1 )
      'set z 'z2
      lev2min = qdims( levmin )
      'set z 'z2+1
      lev2max = qdims( levmin )

      if( ( lev2min <= lev1 & lev1 <= lev2max ) | ( lev2max <= lev1 & lev1 <= lev2min ) ) ; break ; endif
      z2 = z2 + 1
    endwhile


***** linear interpolation or fill undef
    'set dfile 'df1
    'set z 'z1
    if( z2 < z2max )
      w = ( lev1 - lev2min ) / ( lev2max - lev2min )
      'tmp = lterp( 'w' * 'v2'(z='z2+1') + (1-'w') * 'v2'(z='z2'), 'v1' ) - 'v1
    else
*      say 'undef: 'lev1
      'tmp = maskout( v1, v1*0-1 )'
    endif

***** set value for d
    lev1min = lev1 - 1e-5
    lev1max = lev1 + 1e-5
    'set z 1 'z1max
    d' = 'd' + const( maskout( tmp, -(lev-'lev1min')*(lev-'lev1max') ), 0, -u )'

    z1 = z1 + 1
  endwhile

  'set lev '_levmin' '_levmax
return



function v2s( var )
  'd 'var
  value = subwrd( result, 4 )
  return value
end function


*
* varid, varcnfid -> name, unit, min, ...
*
function get_varcnf( f, varid, varcnfid )
  sname = ''

* varid -> varid_base, varid_lev
  target.1 = 'u'
  target.2 = 'v'
  target.3 = 't'
  target.4 = 'rh'
  target.5 = 'qv'
  tarmax = 5

  tar = 1
  while( tar <= tarmax )
    target_len = math_strlen(target.tar)
    tmp1 = substr(varid,1,target_len)
    tmp2 = math_strlen(varid)
    if( tmp1 = target.tar & tmp2 > target_len )
      varid_base = tmp1
      varid_lev = substr(varid,target_len+1,tmp2-target_len)
    endif
    tar = tar + 1
  endwhile

  if( varid = 'aw_crf_toa' )
    name = 'Long+Shortwave Cloud Radiative Forcing @ TOA'
    unit = 'W/m^2'
    min2d  = -100 ; int2d  = 20  ; max2d  = 100
    dmin2d = -50  ; dint2d = 10  ; dmax2d = 50
    min1d  = -100 ; int1d  = 50  ; max1d  = 100
    dmin1d = -50  ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'aw_net_sfc' )
    name = 'Down-Upward Long+Shortwave Radiation @ Surface'
    unit = 'W/m^2'
    min2d  = -200; int2d  = 40  ; max2d  = 200
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = -200; int1d  = 100 ; max1d  = 200
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'aw_net_toa' )
    name = 'Down-Upward Long+Shortwave Radiation @ TOA'
    unit = 'W/m^2'
    min2d  = -200; int2d  = 40  ; max2d  = 200
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = -200; int1d  = 100 ; max1d  = 200
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'energy_net_sfc' )
    name = 'Net Downward Surface Energy Flux'
    unit = 'W/m^2'
    min2d  = -200 ; int2d  = 40  ; max2d  = 200
    dmin2d = -100 ; dint2d = 20  ; dmax2d = 100
    min1d  = -200 ; int1d  = 100 ; max1d  = 200
    dmin1d = -50  ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->bluered->maroon'
    dcolor = 'purple->bluered->maroon'
  endif

  if( varid = 'evap' )
    name = 'Evaporation'
    unit = 'mm/day'
    min2d  = 0.5 ; int2d  = 0.5 ; max2d  = 8
    dmin2d = -4 ; dint2d = 0.5 ; dmax2d = 4
    min1d  = 0   ; int1d  = 2 ; max1d  = 8
    dmin1d = -2  ; dint1d = 1 ; dmax1d = 2
    color  = 'white-(0)->grainbow'
    dcolor = 'bluered'
  endif

  if( varid = 'ice' )
    name = 'Sea Ice Mass'
    unit = 'kg/m`a2`n'
    min2d  = 200  ; int2d  = 200 ; max2d  = 2000
    dmin2d = -100 ; dint2d = 10  ; dmax2d = 100
    min1d  = 0    ; int1d  = 500 ; max1d  = 2000
    dmin1d = -500 ; dint1d = 100 ; dmax1d = 500
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'icr' )
    name = 'Sea Ice Fraction'
    unit = '%'
    min2d  = 10  ; int2d  = 10 ; max2d  = 90
    dmin2d = -25 ; dint2d = 5  ; dmax2d = 25
    min1d  = 0   ; int1d  = 25 ; max1d  = 100
    dmin1d = -50 ; dint1d = 25 ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'iwp' )
    name = 'Ice Water Path'
    unit = 'g/m^2'
    min2d  = 20  ; int2d  = 20  ; max2d  = 200
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 0   ; int1d  = 100 ; max1d  = 200
    dmin1d = -40 ; dint1d = 20  ; dmax1d = 40
    color  = 'grainbow'
    dcolor = 'bluered'
    if( varcnfid = '2' )
      min2d  = 0    ; int2d  = 40 ; max2d  = 400
      dmin2d = -200 ; dint2d = 40 ; dmax2d = 200
    endif
  endif

*  if( varid = 'land_wg_z1' | varid = 'land_wg_z2' | varid = 'land_wg_z3' | varid = 'land_wg_z4' | varid = 'land_wg_z5' )
  if( substr(varid,1,7) = 'land_wg' )
    if( varid = 'land_wg1' ) ; name = 'Soil Water @ z=1' ; endif
    if( varid = 'land_wg2' ) ; name = 'Soil Water @ z=2' ; endif
    if( varid = 'land_wg3' ) ; name = 'Soil Water @ z=3' ; endif
    if( varid = 'land_wg4' ) ; name = 'Soil Water @ z=4' ; endif
    if( varid = 'land_wg5' ) ; name = 'Soil Water @ z=5' ; endif
    unit = '0-1'
    min2d  = 0.1  ; int2d  = 0.1  ; max2d  = 0.9
    dmin2d = -0.2 ; dint2d = 0.04 ; dmax2d = 0.2
    min1d  = 0    ; int1d  = 0.25 ; max1d  = 1
    dmin1d = -0.1 ; dint1d = 0.05 ; dmax1d = 0.1
    if( varid = 'land_wg5' )
      dmin2d = -0.1 ; dint2d = 0.02 ; dmax2d = 0.1
      dmin1d = -0.05 ; dint1d = 0.025 ; dmax1d = 0.05
    endif
    color  = 'grainbow'
    dcolor = 'purple->bluered->maroon'
  endif

  tmp = substr( varid, 1, 5 )
  if( tmp = 'isccp' )
    if( varid = 'isccp_ctp_all' | varid = 'isccp_ctp_all_vis' )
      name = 'Cloud Top Pressure by ISCCP'
      tmp = substr( varid, 7, 20 )
      sname.f = ', ' % tmp
      unit = '%'
      min2d  = 100 ; int2d  = 100 ; max2d  = 900
      dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
      min1d  = 100 ; int1d  = 200 ; max1d  = 900
      dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
      color  = 'white-(0)->grainbow'
      dcolor = 'purple->blue->white->red->brown'
    else ; if( varid = 'isccp_od_all' | varid = 'isccp_od_all_vis' )
      name = 'log(Cloud Optical Depth) by ISCCP'
      tmp = substr( varid, 7, 20 )
      sname.f = ', ' % tmp
      unit = '%'
      min2d  = -1   ; int2d  = 0.5 ; max2d  = 4
      dmin2d = -0.5 ; dint2d = 0.1 ; dmax2d = 0.5
      min1d  = -1   ; int1d  = 1   ; max1d  = 4
      dmin1d = -0.5 ; dint1d = 0.5 ; dmax1d = 0.5
      color  = 'white-(0)->grainbow'
      dcolor = 'purple->blue->white->red->brown'
    else
*      name = 'ISCCP Cloud Fraction'
      name = chcase(varid,'upper') % ' Cloud Fraction'
      tmp = substr( varid, 7, 20 )
      sname.f = ', ' % tmp
      unit = '%'
      min2d  = 10  ; int2d  = 10 ; max2d  = 90
      dmin2d = -50 ; dint2d = 10 ; dmax2d = 50
*      dmin2d = -10 ; dint2d = 2  ; dmax2d = 10
      min1d  = 0   ; int1d  = 25 ; max1d  = 100
      dmin1d = -20 ; dint1d = 10 ; dmax1d = 20
*      dmin1d = -10 ; dint1d = 5  ; dmax1d = 10
      color  = 'white-(0)->grainbow'
      dcolor = 'purple->blue->white->red->brown'
*      dcolor = 'white->white->gray'
    endif ; endif
  endif

  if( varid = 'lh_sfc' | varid = 'sh_sfc' )
    if( varid = 'sh_sfc' ) ; name = 'Surface Sensible Heat Flux' ; endif
    if( varid = 'lh_sfc' ) ; name = 'Surface Latent Heat Flux'   ; endif
    unit = 'W/m^2'
    min2d  = -200 ; int2d  = 40  ; max2d  = 200
    dmin2d = -100 ; dint2d = 20  ; dmax2d = 100
    min1d  = -200 ; int1d  = 100 ; max1d  = 200
    dmin1d = -50  ; dint1d = 25  ; dmax1d = 50
*    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    color  = 'purple->bluered->maroon'
*    dcolor = 'bluered'
    dcolor = 'purple->bluered->maroon'
  endif

  if( varid = 'lw_up_toa' | varid = 'lw_up_clr_toa' )
    name = 'Upward Longwave Radiation @ TOA'
    if( varid = 'lw_up_clr_toa' ) ; name = name % ' (Clear Sky)' ; endif
    unit = 'W/m^2'
    min2d  = 100 ; int2d  = 20  ; max2d  = 340
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 100 ; int1d  = 50  ; max1d  = 300
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'lw_crf_toa' )
    name = 'Longwave Cloud Radiative Forcing @ TOA'
    unit = 'W/m^2'
    min2d  = -100 ; int2d  = 20  ; max2d  = 100
    dmin2d = -50  ; dint2d = 10  ; dmax2d = 50
    min1d  = -100 ; int1d  = 50  ; max1d  = 100
    dmin1d = -50  ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'lw_up_sfc' )
    name = 'Upward Longwave Radiation @ Surface'
    unit = 'W/m^2'
    min2d  = 100 ; int2d  = 30  ; max2d  = 480
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 100 ; int1d  = 200 ; max1d  = 500
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'lw_down_sfc' )
    name = 'Downward Longwave Radiation @ Surface'
    unit = 'W/m^2'
    min2d  = 100 ; int2d  = 30  ; max2d  = 480
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 100 ; int1d  = 200 ; max1d  = 500
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'lwp' )
    name = 'Liquid Water Path'
    unit = 'g/m^2'
    min2d  = 20  ; int2d  = 20  ; max2d  = 200
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 0   ; int1d  = 100 ; max1d  = 200
    dmin1d = -40 ; dint1d = 20  ; dmax1d = 40
    color  = 'grainbow'
    dcolor = 'bluered'
    if( varcnfid = '2' )
      min2d  = 0    ; int2d  = 40 ; max2d  = 400
      dmin2d = -200 ; dint2d = 40 ; dmax2d = 200
    endif
  endif

  if( varid = 'mslp' | varid = 'mslp_ecmwf' )
    name = 'MSLP'
    if( varid = 'mslp_ecmwf' ) ; name = name % '`becmwf`n'; endif
    unit = 'hPa'
*    min2d  = 1000 ; int2d  = 2 ; max2d  = 1030
    min2d  = 980 ; int2d  = 4 ; max2d  = 1030
    dmin2d = -10  ; dint2d = 2 ; dmax2d = 10
*    dmin2d = -5   ; dint2d = 1 ; dmax2d = 5
*    min1d  = 1005 ; int1d  = 5 ; max1d  = 1025
    min1d  = 980 ; int1d  = 20 ; max1d  = 1030
    dmin1d = -10  ; dint1d = 5 ; dmax1d = 10
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'precip' )
    name = 'Precipitation'
    unit = 'mm/day'
    min2d  = 1   ; int2d  = 1 ; max2d  = 20
    dmin2d = -10 ; dint2d = 1 ; dmax2d = 10
    min1d  = 0   ; int1d  = 3 ; max1d  = 15
    dmin1d = -6  ; dint1d = 2 ; dmax1d = 6
*    color = 'purple->blue->aqua->lime->yellow->red->maroon'
    color  = 'white-(0)->grainbow'
    dcolor = 'bluered'
  endif

  if( varid = 'pt_700_minus_925' )
    name = '`3z`0`b700`n-`3z`0`b925`n'
    unit = 'K'
    min2d  = 10 ; int2d  = 2   ; max2d  = 30
    dmin2d = -5 ; dint2d = 1   ; dmax2d = 5
    min1d  = 10 ; int1d  = 5   ; max1d  = 30
    dmin1d = -5 ; dint1d = 2.5 ; dmax1d = 5
    color  = 'grainbow'
    dcolor = 'bluered'
  endif

  if( varid = 'pt_z3000s_minus_z500s' )
    name = '`3z`0`b700`n-`3z`0`b925`n'
    unit = 'K'
    min2d  = 10 ; int2d  = 2   ; max2d  = 30
    dmin2d = -5 ; dint2d = 1   ; dmax2d = 5
    min1d  = 10 ; int1d  = 5   ; max1d  = 30
    dmin1d = -5 ; dint1d = 2.5 ; dmax1d = 5
    color  = 'grainbow'
    dcolor = 'bluered'
  endif

  if( varid = 'qv2m' )
    name = '2m Specif Humidity'
    unit = 'g/kg'
    min2d  = 2  ; int2d  = 2   ; max2d  = 20
    dmin2d = -2 ; dint2d = 0.4 ; dmax2d = 2
    min1d  = 0  ; int1d  = 5   ; max1d  = 20
    dmin1d = -2 ; dint1d = 1   ; dmax1d = 2
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid_base = 'qv' & valnum(varid_lev) != 0 )
    name = 'Specif Humidity @ 'varid_lev'hPa'
    unit = 'g/kg'
    min2d  = 2  ; int2d  = 2   ; max2d  = 20
    dmin2d = -5 ; dint2d = 1   ; dmax2d = 5
    min1d  = 0  ; int1d  = 5   ; max1d  = 20
    dmin1d = -5 ; dint1d = 1   ; dmax1d = 5
    if( varid_lev <= 500 )
      min2d  = 1    ; int2d  = 1   ; max2d  = 10
      dmin2d = -2.5 ; dint2d = 0.5 ; dmax2d = 2.5
      min1d  = 0    ; int1d  = 2.5 ; max1d  = 10
      dmin1d = -2   ; dint1d = 1   ; dmax1d = 2
    endif
    if( varid_lev <= 300 )
      min2d  = 0.2  ; int2d  = 0.2  ; max2d  = 2.0
      dmin2d = -0.5 ; dint2d = 0.1  ; dmax2d = 0.5
      min1d  = 0    ; int1d  = 0.5  ; max1d  = 2.0
      dmin1d = -0.5 ; dint1d = 0.25 ; dmax1d = 0.5
    endif
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid_base = 'rh' & valnum(varid_lev) != 0 )
    name = 'Relative Humidity @ 'varid_lev'hPa'
    unit = '%'
    min2d  = 10  ; int2d  = 10 ; max2d  = 100
    dmin2d = -50 ; dint2d = 10 ; dmax2d = 50
    min1d  = 0   ; int1d  = 25 ; max1d  = 100
    dmin1d = -20 ; dint1d = 10 ; dmax1d = 20
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'sst' )
    name = 'Sea Surface Temperature'
    unit = 'K'
    min2d  = 273 ; int2d  = 3   ; max2d  = 306
    dmin2d = -3  ; dint2d = 0.5 ; dmax2d = 3
    min1d  = 270 ; int1d  = 10  ; max1d  = 306
    dmin1d = -3  ; dint1d = 1.5 ; dmax1d = 3
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'sw_up_toa' | varid = 'sw_up_clr_toa' )
    name = 'Upward Shortwave Radiation @ TOA'
    if( varid = 'sw_up_clr_toa' ) ; name = name % ' (Clear Sky)' ; endif
    unit = 'W/m^2'
    min2d  = 0   ; int2d  = 40  ; max2d  = 400
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 0   ; int1d  = 100 ; max1d  = 300
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'sw_crf_toa' )
    name = 'Shortwave Cloud Radiative Forcing @ TOA'
    unit = 'W/m^2'
    min2d  = -100 ; int2d  = 20  ; max2d  = 100
    dmin2d = -50  ; dint2d = 10  ; dmax2d = 50
    min1d  = -100 ; int1d  = 50  ; max1d  = 100
    dmin1d = -50  ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'sw_up_sfc' )
    name = 'Upward Shortwave Radiation @ Surface'
    unit = 'W/m^2'
    min2d  = 0   ; int2d  = 20  ; max2d  = 200
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 0   ; int1d  = 100 ; max1d  = 200
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'sw_down_toa' )
    name = 'Downward Shortwave Radiation @ TOA'
    unit = 'W/m^2'
    min2d  = 0   ; int2d  = 50  ; max2d  = 500
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 0   ; int1d  = 250 ; max1d  = 500
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
*    color  = 'grainbow'
    dcolor = 'bluered'
  endif

  if( varid = 'sw_down_sfc' )
    name = 'Downward Shortwave Radiation @ Surface'
    unit = 'W/m^2'
    min2d  = 0   ; int2d  = 40  ; max2d  = 400
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 0   ; int1d  = 100 ; max1d  = 400
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
*    color  = 'grainbow'
    dcolor = 'bluered'
  endif

  if( varid = 'sw_net_toa' )
    name = 'Down-Upward Shortwave Radiation @ TOA'
    unit = 'W/m^2'
    min2d  = 0   ; int2d  = 40  ; max2d  = 400
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 0   ; int1d  = 100 ; max1d  = 300
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 't2m' )
    name = '2m Temperature'
    unit = 'K'
    min2d  = 200 ; int2d  = 10 ; max2d  = 320
    dmin2d = -10 ; dint2d = 1  ; dmax2d = 10
    min1d  = 220 ; int1d  = 30 ; max1d  = 310
    dmin1d = -6  ; dint1d = 3  ; dmax1d = 6
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid_base = 't' & valnum(varid_lev) != 0 )
    name = 'Temperature @ 'varid_lev'hPa'
    unit = '%'
    min2d  = 220 ; int2d  = 5  ; max2d  = 300
    dmin2d = -10 ; dint2d = 1  ; dmax2d = 10
    min1d  = 220 ; int1d  = 30 ; max1d  = 300
    dmin1d = -6  ; dint1d = 3  ; dmax1d = 6
    if( varid_lev <= 500 )
      min2d  = 200 ; int2d  = 5  ; max2d  = 280
      dmin2d = -10 ; dint2d = 1  ; dmax2d = 10
      min1d  = 200 ; int1d  = 30 ; max1d  = 280
      dmin1d = -6  ; dint1d = 3  ; dmax1d = 6
    endif
    if( varid_lev <= 300 )
      min2d  = 180 ; int2d  = 5  ; max2d  = 260
      dmin2d = -10 ; dint2d = 1  ; dmax2d = 10
      min1d  = 180 ; int1d  = 30 ; max1d  = 260
      dmin1d = -6  ; dint1d = 3  ; dmax1d = 6
    endif
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'u10m' )
    name = '10m Zonal Wind'
    unit = 'm/s'
    min2d  = -10 ; int2d  = 2 ; max2d  = 10
    dmin2d = -5  ; dint2d = 1 ; dmax2d = 5
    min1d  = -10 ; int1d  = 5 ; max1d  = 10
    dmin1d = -4  ; dint1d = 2 ; dmax1d = 4
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid_base = 'u' & valnum(varid_lev) != 0 )
    name = 'Zonal Wind @ 'varid_lev'hPa'
    unit = 'm/s'
    min2d  = -30 ; int2d  = 5  ; max2d  = 30
    dmin2d = -10 ; dint2d = 2  ; dmax2d = 10
    min1d  = -30 ; int1d  = 15 ; max1d  = 30
    dmin1d = -10 ; dint1d = 5  ; dmax1d = 10
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'v10m' )
    name = '10m Meridional Wind'
    unit = 'm/s'
    min2d  = -10 ; int2d  = 2 ; max2d  = 10
    dmin2d = -5  ; dint2d = 1 ; dmax2d = 5
    min1d  = -10 ; int1d  = 5 ; max1d  = 10
    dmin1d = -4  ; dint1d = 2 ; dmax1d = 4
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid_base = 'v' & valnum(varid_lev) != 0 )
    name = 'Meridional Wind @ 'varid_lev'hPa'
    unit = 'm/s'
    min2d  = -5   ; int2d  = 1   ; max2d  = 5
    dmin2d = -2.5 ; dint2d = 0.5 ; dmax2d = 2.5
    min1d  = -5   ; int1d  = 2.5 ; max1d  = 5
    dmin1d = -2   ; dint1d = 1   ; dmax1d = 2
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'lw_net_sfc' )
    name = 'Down-Upward Longwave Radiation @ Surface'
    unit = 'W/m^2'
    min2d  = -200; int2d  = 20  ; max2d  = 0
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = -100; int1d  = 50  ; max1d  = 0
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'sw_net_sfc' )
    name = 'Down-Upward Shortwave Radiation @ Surface'
    unit = 'W/m^2'
    min2d  = 0   ; int2d  = 40  ; max2d  = 400
    dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
    min1d  = 0   ; int1d  = 100 ; max1d  = 300
    dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif


* set default varcnf to global varcnf 
  if(   _name.f =   '_name.'f ) ;   _name.f =   name ; endif
  if(   _unit.f =   '_unit.'f ) ;   _unit.f =   unit ; endif
  if(  _min2d.f =  '_min2d.'f ) ;  _min2d.f =  min2d ; endif
  if(  _int2d.f =  '_int2d.'f ) ;  _int2d.f =  int2d ; endif
  if(  _max2d.f =  '_max2d.'f ) ;  _max2d.f =  max2d ; endif
  if( _dmin2d.f = '_dmin2d.'f ) ; _dmin2d.f = dmin2d ; endif
  if( _dint2d.f = '_dint2d.'f ) ; _dint2d.f = dint2d ; endif
  if( _dmax2d.f = '_dmax2d.'f ) ; _dmax2d.f = dmax2d ; endif
  if(  _min1d.f =  '_min1d.'f ) ;  _min1d.f =  min1d ; endif
  if(  _int1d.f =  '_int1d.'f ) ;  _int1d.f =  int1d ; endif
  if(  _max1d.f =  '_max1d.'f ) ;  _max1d.f =  max1d ; endif
  if( _dmin1d.f = '_dmin1d.'f ) ; _dmin1d.f = dmin1d ; endif
  if( _dint1d.f = '_dint1d.'f ) ; _dint1d.f = dint1d ; endif
  if( _dmax1d.f = '_dmax1d.'f ) ; _dmax1d.f = dmax1d ; endif
  if(  _color.f =  '_color.'f ) ;  _color.f =  color ; endif
  if( _dcolor.f = '_dcolor.'f ) ; _dcolor.f = dcolor ; endif
  if( _sname.f  =  '_sname.'f ) ;  _sname.f = sname  ; endif

return


function set_cnf()
*----- set default values
  _varid      = ''
  _cbar       = 'hor'
*  _cbar.1     = '2'
*  _cbar.2     = ''
  _mpdraw     = 'on'
  _cont       = 'off'
  _time_start = ''
  _time_end   = ''
  _year       = 2004
  _month      = 6
  _year_start = ''
  _year_end   = ''
  _fmax       = 0
  _save       = ''
  i = 1
  while( i <= 6 )
    _disp.i = ''
    _cont.i = ''
    _cbar.i = ''
    i = i + 1
  endwhile

*----- load cnf_latlon.gsf
*  rc = gsfpath( 'cnf cnf_sample database' )
  rc = gsfpath( 'cnf cnf_sample' )
  ret = cnf_latlon()

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
*  ret = read( 'inc_latlon.gsf' )
*  stat = sublin( ret, 1 )
*  if( stat = 0 )
*    say 'error: temporal file inc_latlon.gsf exists. Please remove.'
*    say '(illegal multiple execution may occur)'
*    exit
*  endif
*
** load cnf
*  ret = write( 'inc_latlon.gsf', 'function inc_latlon()' )
*  ret = write( 'inc_latlon.gsf', 'ret = 'cnf'()' )
*  ret = write( 'inc_latlon.gsf', 'return ret' )
*  ret = close( 'inc_latlon.gsf' )
*  ret = inc_latlon()
*  '!rm inc_latlon.gsf'
*

* set default and/or necessary values necessary after loading cnf
  i = 1
  while( i <= 6 )
    if( _cont.i = '' ) ; _cont.i = _cont ; endif
    i = i + 1
  endwhile

  f = 1
  while( f <= _fmax )
    if( (   _name != '' &   _name !=   '_name' ) & (   _name.f = '' |   _name.f =   '_name.'f ) ) ;   _name.f =   _name ; endif
    if( (   _unit != '' &   _unit !=   '_unit' ) & (   _unit.f = '' |   _unit.f =   '_unit.'f ) ) ;   _unit.f =   _unit ; endif
    if( (  _min2d != '' &  _min2d !=  '_min2d' ) & (  _min2d.f = '' |  _min2d.f =  '_min2d.'f ) ) ;  _min2d.f =  _min2d ; endif
    if( (  _int2d != '' &  _int2d !=  '_int2d' ) & (  _int2d.f = '' |  _int2d.f =  '_int2d.'f ) ) ;  _int2d.f =  _int2d ; endif
    if( (  _max2d != '' &  _max2d !=  '_max2d' ) & (  _max2d.f = '' |  _max2d.f =  '_max2d.'f ) ) ;  _max2d.f =  _max2d ; endif
    if( ( _dmin2d != '' & _dmin2d != '_dmin2d' ) & ( _dmin2d.f = '' | _dmin2d.f = '_dmin2d.'f ) ) ; _dmin2d.f = _dmin2d ; endif
    if( ( _dint2d != '' & _dint2d != '_dint2d' ) & ( _dint2d.f = '' | _dint2d.f = '_dint2d.'f ) ) ; _dint2d.f = _dint2d ; endif
    if( ( _dmax2d != '' & _dmax2d != '_dmax2d' ) & ( _dmax2d.f = '' | _dmax2d.f = '_dmax2d.'f ) ) ; _dmax2d.f = _dmax2d ; endif
    if( (  _min1d != '' &  _min1d !=  '_min1d' ) & (  _min1d.f = '' |  _min1d.f =  '_min1d.'f ) ) ;  _min1d.f =  _min1d ; endif
    if( (  _int1d != '' &  _int1d !=  '_int1d' ) & (  _int1d.f = '' |  _int1d.f =  '_int1d.'f ) ) ;  _int1d.f =  _int1d ; endif
    if( (  _max1d != '' &  _max1d !=  '_max1d' ) & (  _max1d.f = '' |  _max1d.f =  '_max1d.'f ) ) ;  _max1d.f =  _max1d ; endif
    if( ( _dmin1d != '' & _dmin1d != '_dmin1d' ) & ( _dmin1d.f = '' | _dmin1d.f = '_dmin1d.'f ) ) ; _dmin1d.f = _dmin1d ; endif
    if( ( _dint1d != '' & _dint1d != '_dint1d' ) & ( _dint1d.f = '' | _dint1d.f = '_dint1d.'f ) ) ; _dint1d.f = _dint1d ; endif
    if( ( _dmax1d != '' & _dmax1d != '_dmax1d' ) & ( _dmax1d.f = '' | _dmax1d.f = '_dmax1d.'f ) ) ; _dmax1d.f = _dmax1d ; endif
    if( (  _color != '' &  _color !=  '_color' ) & (  _color.f = '' |  _color.f =  '_color.'f ) ) ;  _color.f =  _color ; endif
    if( ( _dcolor != '' & _dcolor != '_dcolor' ) & ( _dcolor.f = '' | _dcolor.f = '_dcolor.'f ) ) ; _dcolor.f = _dcolor ; endif
    f = f + 1
  endwhile

  say ''
return
