*
* prepare cnf_latzm.gsf in the same directory, cnf/ or cnf_sample/.
*
function latzm( args )
'reinit'
  rc = gsfallow( 'on' )

*----- set frame (depends on frame size ... TODO)
  'set line 0'
  'draw rec 0 0 11 8.5'

*----- set cnf by loading cnf_latlon.gsf
  set_cnf()

  set_time()



*----- Variable List
  f = 1
  while( f <= _fmax )
    if( _varid.f = '_varid.'f | _varid.f = '' ) ; _varid.f = _varid ; endif
    say f % ': ' % _varid.f

* varid, varcnf -> name, unit, min, ...
* 1. call get_varcnf without varcnfid (default varcnf will be set)
* 2. load cnf
* 3. call get_varcnf again if varcnfid is set in cnf.

    get_varcnf( f, _varid.f, _varcnfid )

    f = f + 1
  endwhile

name = _name.1
unit = _unit.1
f = 2
while( f <= _fmax )
  if( name != _name.f | unit != _unit.f ) ; name = '' ; unit = '' ; break ; endif
  f = f + 1
endwhile


***************************************************************
* Calculate
***************************************************************
f = 1
while( f <= _fmax )
*  say 'Processing #'f
  'set dfile '_f2df.f
  xdef = qctlinfo( f, 'xdef', 1 )
  ydef = qctlinfo( f, 'ydef', 1 )
  zdef = qctlinfo( f, 'zdef', 1 )
  tdef = qctlinfo( f, 'tdef', 1 )
  say 'xdef='xdef
  if( xdef > 1 )
    _var.f = 'ave(' % _var.f % ',x=1,x=' % xdef % ')'
  endif

* if data is climatology
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
  'set lat '_latmin' '_latmax
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
'mul 1 2 1 2'
'set grads off'

f = 1
while( f <= _fmax )
  'set dfile '_f2df.f
  'set x 1'
  'set lat '_latmin' '_latmax
  'set z 1'
  'set t 1'

  'set vrange '_min.f' '_max.f
  'set ylint '_int.f
  'set xlopts 1 6 0.18'
  'set ylopts 1 6 0.18'
  'set cmark 0'
  'set cthick '_cthick.f ; 'set ccolor '_ccolor.f ; 'set cstyle '_cstyle.f
  'd v'f

  'gm'f' = ave( v'f', lat='_latmin', lat='_latmax' )'
  gm = v2s( 'gm'f )
  gm = math_format( '%.2f', gm )

  yoffset = -0.3 * f
  'setfont normal'
  if( name = '' | unit = '' )
    'draws -pos tl -base l -xoffset 0.7 -yoffset 'yoffset' -color '_ccolor.f' '_name.f' ['_unit.f'], '_run.f
  else
    'draws -pos tl -base l -xoffset 0.7 -yoffset 'yoffset' -color '_ccolor.f' '_run.f
  endif
  'draws -pos tr -base r -xoffset -0.2 -yoffset 'yoffset' -color '_ccolor.f' 'gm
  ypos = 7.8 - (f-1) * 0.3
  'set line '_ccolor.f' '_cstyle.f' '_cthick.f
  'draw line 1.1 'ypos' 1.6 'ypos

  f = f + 1
endwhile

'setfont normal'
if( name = '' | unit = '' )
  'draws Zonal means, '_term' 'year
else
  'draws Zonal Mean 'name' ['unit'], '_term' '_year
endif
* TODO: _sname.f

****************************
if( _diff = -1 ) ; exit ; endif
'mul 1 2 1 1 -yoffset 0.3'
'set dfile 1'
'set grads off'

f = 1
*b = 1
while( f <= _fmax )
  'set vrange '_dmin.f' '_dmax.f
  'set ylint '_dint.f
  'set xlopts 1 6 0.18'
  'set ylopts 1 6 0.18'
  'set cmark 0'
  'set cthick '_cthick.f ; 'set ccolor '_ccolor.f ; 'set cstyle '_cstyle.f
*  'd lterp(v'f',v'_diff') - v'_diff
  'v = lterp(v'f',v'_diff') - v'_diff
  'd v'

  'gm = ave( v, lat='_latmin', lat='_latmax' )'
  gm = v2s( 'gm' )

*  gm = v2s( '(gm'f'-gm'_diff')' )
  gm = math_format( '%.2f', gm )

  if( f != _diff )
    yoffset = -0.3 * f
    'setfont normal'

    if( name = '' | unit = '' )
      'draws -pos tl -base l -xoffset 0.7 -yoffset 'yoffset' -color '_ccolor.f' '_name.f' ['_unit.f'], '_run.f
    else
      'draws -pos tl -base l -xoffset 0.7 -yoffset 'yoffset' -color '_ccolor.f' '_run.f
    endif
    'draws -pos tr -base r -xoffset -0.2 -yoffset 'yoffset' -color '_ccolor.f' 'gm

    ypos = 4.1 - (f-1) * 0.3
    'set line '_ccolor.f' '_cstyle.f' '_cthick.f
    'draw line 1.1 'ypos' 1.6 'ypos
  endif

  f = f + 1
endwhile

'setfont normal'
'draws Comparison with '_run._diff

if( _save != '_save' & _save != '' )
*  'save '_save
  prex( 'gxprint '_save'.eps white' )
endif

exit


***************************************************************
*'set datawarn off'
*
* for each month
*if( month >= 1 & month <= 12 )
*  term = cmonth( month, 3 )
*  termpp = cmonth( month+1, 3 )
*endif
*if( month = 678 )
*  term = 'JJA'
*endif
****************************************************************
*
*
****************************************************************
** Legend
****************************************************************
*'setfont tiny -base l'
*'draw string 0.1 1.05 file : 'gs
*f = 1
*while( f <= fmax )
*  ypos = 0.90 - 0.15 * (f-1)
*  if( clim_arg.f != '' )
*    'draw string 0.1 'ypos' 'run.f': 'clim_arg.f
*  else
*    'draw string 0.1 'ypos' 'run.f': 'time_start.f'-'time_end.f
*  endif
*  f = f + 1
*endwhile



function v2s( var )
  'd 'var
  value = subwrd( result, 4 )
  return value
end function


*
* varid, varcnfid -> name, unit, min, ...
*
function get_varcnf( f, varid, varcnfid )

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
    min  = -100 ; int  = 50  ; max  = 100
    dmin = -50  ; dint = 25  ; dmax = 50
  endif

  if( varid = 'aw_net_sfc' )
    name = 'Down-Upward Long+Shortwave Radiation @ Surface'
    unit = 'W/m^2'
    min  = -200 ; int  = 100 ; max  = 200
    dmin = -50  ; dint = 25  ; dmax = 50
  endif

  if( varid = 'aw_net_toa' )
    name = 'Down-Upward Long+Shortwave Radiation @ TOA'
    unit = 'W/m^2'
    min  = -200 ; int  = 100 ; max  = 200
    dmin = -50  ; dint = 25  ; dmax = 50
  endif

  if( varid = 'energy_net_sfc' )
    name = 'Net Downward Surface Energy Flux'
    unit = 'W/m^2'
    min  = -200 ; int  = 100 ; max  = 200
    dmin = -50  ; dint = 25  ; dmax = 50
  endif

  if( varid = 'evap' )
    name = 'Evaporation'
    unit = 'mm/day'
    min  = 0   ; int  = 2 ; max  = 8
    dmin = -2  ; dint = 1 ; dmax = 2
  endif

  if( varid = 'iwp' )
    name = 'Ice Water Path'
    unit = 'kg/m^2'
    min  = 0   ; int  = 50 ; max  = 200
    dmin = -40 ; dint = 20 ; dmax = 40
  endif

  tmp = substr( varid, 1, 5 )
  if( tmp = 'isccp' )
    if( varid = 'isccp_ctp_all' | varid = 'isccp_ctp_all_vis' )
      name = 'Cloud Top Pressure by ISCCP'
      tmp = substr( varid, 7, 20 )
      sname = ', ' % tmp
      unit = '%'
      min  = 100 ; int  = 200 ; max  = 900
      dmin = -50 ; dint = 25  ; dmax = 50
    else ; if( varid = 'isccp_od_all' | varid = 'isccp_od_all_vis' )
      name = 'log(Cloud Optical Depth) by ISCCP'
      tmp = substr( varid, 7, 20 )
      sname = ', ' % tmp
      unit = '%'
      min  = -1   ; int  = 1   ; max  = 4
      dmin = -0.5 ; dint = 0.5 ; dmax = 0.5
    else
      name = chcase(varid,'upper') % ' Cloud Fraction'
      tmp = substr( varid, 7, 20 )
      sname = ', ' % tmp
      unit = '%'
      min  = 0   ; int  = 25 ; max  = 100
      dmin = -20 ; dint = 10 ; dmax = 20
    endif ; endif
  endif

  if( varid = 'lh_sfc' | varid = 'sh_sfc' )
    if( varid = 'sh_sfc' ) ; name = 'Surface Sensible Heat Flux' ; endif
    if( varid = 'lh_sfc' ) ; name = 'Surface Latent Heat Flux'   ; endif
    unit = 'W/m^2'
    min  = -200 ; int  = 100 ; max  = 200
    dmin = -50  ; dint = 25  ; dmax = 50
  endif

  if( varid = 'lw_up_toa' | varid = 'lw_up_clr_toa' )
    name = 'Upward Longwave Radiation @ TOA'
    if( varid = 'lw_up_clr_toa' ) ; name = name % ' (Clear Sky)' ; endif
    unit = 'W/m^2'
    min  = 100 ; int  = 50  ; max  = 300
    dmin = -50 ; dint = 25  ; dmax = 50
  endif

  if( varid = 'lw_crf_toa' )
    name = 'Longwave Cloud Radiative Forcing @ TOA'
    unit = 'W/m^2'
    min  = -100 ; int  = 50  ; max  = 100
    dmin = -50  ; dint = 25  ; dmax = 50
  endif

  if( varid = 'lw_up_sfc' )
    name = 'Upward Longwave Radiation @ Surface'
    unit = 'W/m^2'
    min  = 100 ; int  = 200 ; max  = 500
    dmin = -50 ; dint = 25  ; dmax = 50
  endif

  if( varid = 'lw_down_sfc' )
    name = 'Downward Longwave Radiation @ Surface'
    unit = 'W/m^2'
    min  = 100 ; int  = 200 ; max  = 500
    dmin = -50 ; dint = 25  ; dmax = 50
  endif

  if( varid = 'lw_net_sfc' )
    name = 'Down-Upward Longwave Radiation @ Surface'
    unit = 'W/m^2'
    min  = -100 ; int  = 50 ; max  = 0
    dmin = -50  ; dint = 25 ; dmax = 50
  endif

  if( varid = 'lwp' )
    name = 'Liquid Water Path'
    unit = 'kg/m^2'
    min  = 0   ; int  = 50 ; max  = 200
    dmin = -40 ; dint = 20 ; dmax = 40
  endif

  if( varid = 'precip' )
    name = 'Precipitation'
    unit = 'mm/day'
    min  = 0  ; int  = 2 ; max  = 14
    dmin = -5 ; dint = 1 ; dmax = 5
  endif

  if( varid = 'qv2m' )
    name = '2m Specif Humidity'
    unit = 'g/kg'
    min  = 0  ; int  = 5   ; max  = 20
    dmin = -2 ; dint = 1   ; dmax = 2
  endif

  if( varid_base = 'qv' & valnum(varid_lev) != 0 )
    name = 'Specif Humidity @ 'varid_lev'hPa'
    unit = 'g/kg'
    min  = 0  ; int  = 5   ; max  = 20
    dmin = -5 ; dint = 1   ; dmax = 5
    if( varid_lev <= 500 )
      min  = 0    ; int  = 2.5 ; max  = 10
      dmin = -2   ; dint = 1   ; dmax = 2
    endif
    if( varid_lev <= 300 )
      min  = 0    ; int  = 0.5  ; max  = 2.0
      dmin = -0.5 ; dint = 0.25 ; dmax = 0.5
    endif
  endif

  if( varid_base = 'rh' & valnum(varid_lev) != 0 )
    name = 'Relative Humidity @ 'varid_lev'hPa'
    unit = '%'
    min  = 0   ; int  = 25 ; max  = 100
    dmin = -20 ; dint = 10 ; dmax = 20
  endif

  if( varid = 'sw_up_toa' | varid = 'sw_up_clr_toa' )
    name = 'Upward Shortwave Radiation @ TOA'
    if( varid = 'sw_up_clr_toa' ) ; name = name % ' (Clear Sky)' ; endif
    unit = 'W/m^2'
    min  = 0   ; int  = 100 ; max  = 300
    dmin = -50 ; dint = 25  ; dmax = 50
  endif

  if( varid = 'sw_crf_toa' )
    name = 'Shortwave Cloud Radiative Forcing @ TOA'
    unit = 'W/m^2'
    min  = -100 ; int  = 50  ; max  = 100
    dmin = -50  ; dint = 25  ; dmax = 50
  endif

  if( varid = 'sw_up_sfc' )
    name = 'Upward Shortwave Radiation @ Surface'
    unit = 'W/m^2'
    min  = 0   ; int  = 100 ; max  = 200
    dmin = -50 ; dint = 25  ; dmax = 50
  endif

  if( varid = 'sw_down_toa' )
    name = 'Downward Shortwave Radiation @ TOA'
    unit = 'W/m^2'
    min  = 0   ; int  = 250 ; max  = 500
    dmin = -50 ; dint = 25  ; dmax = 50
  endif

  if( varid = 'sw_down_sfc' )
    name = 'Downward Shortwave Radiation @ Surface'
    unit = 'W/m^2'
    min  = 0   ; int  = 100 ; max  = 400
    dmin = -50 ; dint = 25  ; dmax = 50
  endif

  if( varid = 'sw_net_toa' )
    name = 'Down-Upward Shortwave Radiation @ TOA'
    unit = 'W/m^2'
    min  = 0   ; int  = 100 ; max  = 400
    dmin = -50 ; dint = 25  ; dmax = 50
  endif

  if( varid = 'sw_net_sfc' )
    name = 'Down-Upward Shortwave Radiation @ Surface'
    unit = 'W/m^2'
    min  = 0   ; int  = 100 ; max  = 300
    dmin = -50 ; dint = 25  ; dmax = 50
  endif

  if( varid = 't2m' )
    name = '2m Temperature'
    unit = 'K'
    min  = 220 ; int  = 30 ; max  = 310
    dmin = -6  ; dint = 3  ; dmax = 6
  endif

  if( varid_base = 't' & valnum(varid_lev) != 0 )
    name = 'Temperature @ 'varid_lev'hPa'
    unit = '%'
    min  = 220 ; int  = 30 ; max  = 300
    dmin = -6  ; dint = 3  ; dmax = 6
    if( varid_lev <= 500 )
      min  = 200 ; int  = 30 ; max  = 280
      dmin = -6  ; dint = 3  ; dmax = 6
    endif
    if( varid_lev <= 300 )
      min  = 180 ; int  = 30 ; max  = 260
      dmin = -6  ; dint = 3  ; dmax = 6
    endif
  endif

  if( varid = 'u10m' )
    name = '10m Zonal Wind'
    unit = 'm/s'
    min  = -10 ; int  = 5 ; max  = 10
    dmin = -4  ; dint = 2 ; dmax = 4
  endif

  if( varid_base = 'u' & valnum(varid_lev) != 0 )
    name = 'Zonal Wind @ 'varid_lev'hPa'
    unit = 'm/s'
    min  = -30 ; int  = 15 ; max  = 30
    dmin = -10 ; dint = 5  ; dmax = 10
  endif

  if( varid = 'v10m' )
    name = '10m Meridional Wind'
    unit = 'm/s'
    min  = -10 ; int  = 5 ; max  = 10
    dmin = -4  ; dint = 2 ; dmax = 4
  endif

  if( varid_base = 'v' & valnum(varid_lev) != 0 )
    name = 'Meridional Wind @ 'varid_lev'hPa'
    unit = 'm/s'
    min  = -5   ; int  = 2.5 ; max  = 5
    dmin = -2   ; dint = 1   ; dmax = 2
  endif

* set default varcnf to global varcnf 
  if(  _name.f =  '_name.'f ) ;  _name.f =  name ; endif
  if(  _unit.f =  '_unit.'f ) ;  _unit.f =  unit ; endif
  if(   _min.f =   '_min.'f ) ;   _min.f =   min ; endif
  if(   _int.f =   '_int.'f ) ;   _int.f =   int ; endif
  if(   _max.f =   '_max.'f ) ;   _max.f =   max ; endif
  if(  _dmin.f =  '_dmin.'f ) ;  _dmin.f =  dmin ; endif
  if(  _dint.f =  '_dint.'f ) ;  _dint.f =  dint ; endif
  if(  _dmax.f =  '_dmax.'f ) ;  _dmax.f =  dmax ; endif
  if( _sname.f = '_sname.'f ) ; _sname.f = sname ; endif

return

function set_cnf()

* set default values
  _varid      = ''
  _diff       = 1
  _latmin     = -90
  _latmax     = 90
  _time_start = ''
  _time_end   = ''
  _year       = 2004
  _month      = 6
  _year_start = ''
  _year_end   = ''
  _cstyle     = 1
  _cthick     = 6
  _fmax       = 0
  _save       = ''

*----- load cnf_latlon.gsf
  rc = gsfpath( 'cnf cnf_sample' )
  ret = cnf_latzm()

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
  ret = read( 'inc_latzm.gsf' )
  stat = sublin( ret, 1 )
  if( stat = 0 )
    say 'error: temporal file inc_latzm.gsf exists. Please remove.'
    say '(illegal multiple execution may occur)'
    exit
  endif

* load cnf
  ret = write( 'inc_latzm.gsf', 'function inc_latzm()' )
  ret = write( 'inc_latzm.gsf', 'ret = 'cnf'()' )
  ret = write( 'inc_latzm.gsf', 'return ret' )
  ret = close( 'inc_latzm.gsf' )
  ret = inc_latzm()
  '!rm inc_latzm.gsf'
endif


* set default and/or necessary values necessary after loading cnf
  f = 1
  while( f <= _fmax )
    if( (  _ccolor.f = '' |  _ccolor.f =  '_ccolor.'f ) ) ;  _ccolor.f = f       ; endif
    if( (  _cstyle != '' &  _cstyle !=  '_cstyle' ) & (  _cstyle.f = '' |  _cstyle.f =  '_cstyle.'f ) ) ;  _cstyle.f = _cstyle ; endif
    if( (  _cthick != '' &  _cthick !=  '_cthick' ) & (  _cthick.f = '' |  _cthick.f =  '_cthick.'f ) ) ;  _cthick.f = _cthick ; endif
    f = f + 1
  endwhile

  cmd_fin = ''
  say ''

return

