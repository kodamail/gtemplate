function latlon( args )
'reinit'

* TODO: support mask for ISCCP topography

'!pwd > pwd.tmp'
ret = read( 'pwd.tmp' )
pwd = sublin( ret, 2 )
'!rm -f pwd.tmp'
gs = pwd'/lat_lon_with_zm.gs'
rc = gsfallow("on")

'set line 0'
'draw rec 0 0 11 8.5'

sw = subwrd( args, 1 )
***************************************************************
***************************************************************
***************************************************************
*
* set here
*
if( sw != 'cnf' )
  cnf = sw

* set default values
  _varid      = ''
  _cbar       = 'hor'
  _cbar.1     = '1'
  _cbar.2     = ''
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
    i = i + 1
  endwhile

* check existence of cnf file
  ret = read( cnf'.gsf' )
  stat = sublin( ret, 1 )
  if( stat != 0 )
    say 'error: 'cnf'.gsf does not exist'
    exit
  endif

* check multiple-execution
  ret = read( 'inc_latlon.gsf' )
  stat = sublin( ret, 1 )
  if( stat = 0 )
    say 'error: temporal file inc_latlon.gsf exists. Please remove.'
    say '(illegal multiple execution may occur)'
    exit
  endif

* load cnf
  ret = write( 'inc_latlon.gsf', 'function inc_latlon()' )
  ret = write( 'inc_latlon.gsf', 'ret = 'cnf'()' )
  ret = write( 'inc_latlon.gsf', 'return ret' )
  ret = close( 'inc_latlon.gsf' )
  ret = inc_latlon()
  '!rm inc_latlon.gsf'
  

* set default values necessary after loading cnf
  i = 1
  while( i <= 6 )
    if( _cont.i = '' ) ; _cont.i = _cont ; endif
    i = i + 1
  endwhile

  cmd_fin = ''
  say ''

***************************************************************
***************************************************************
***************************************************************
*
********** arguements from external file (obsolute) **********
else
*  cmd_fin = 'quit'
  cmd_fin = ''

  _cbar = 'hor'
  _cbar.1 = '2'
  _cbar.2 = '5'

  _cont.1 = 'off'
  _cont.2 = 'off'
  _cont.3 = 'off'
  _cont.4 = 'off'
  _cont.5 = 'off'
  _cont.6 = 'off'

  _mpdraw = 'on'

  cnf_fname = subwrd( args, 2 )

***** _varid-name
  tmp = sublin( read( cnf_fname ), 2 )
  _varid = subwrd( tmp, 1 )
  _varid.1 = subwrd( tmp, 2 )
  _varid.2 = subwrd( tmp, 3 )
  _varid.3 = subwrd( tmp, 4 )
  _varid.4 = subwrd( tmp, 5 )
  _varid.5 = subwrd( tmp, 6 )
  _varid.6 = subwrd( tmp, 7 )
  say '_varid = ' % _varid

***** ( -ym year month | -time start endpp | -clim year_start year_end month)
  tmp = sublin( read( cnf_fname ), 2 )
  p = 1
  while( p <= 100 )
    tmp.p  = subwrd( tmp, p )
    if( tmp.p = '' ) ; break ; endif
    say p % ": " % tmp.p
    tmph = strrep( tmp.p, '.', ' ')
    tmpt = subwrd( tmph, 2 )
    tmph = subwrd( tmph, 1 )

    if( tmp.p = '-year' )
*     e.g. year=2004, month=6
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _year  = tmp.p
      say 'year  = ' % _year
      p = p + 1 ; continue
    endif

    if( tmp.p = '-ym' )
*     e.g. year=2004, month=6
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _year  = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _month = tmp.p
      say 'year  = ' % _year
      say 'month = ' % _month
      p = p + 1 ; continue
    endif

    if( tmp.p = '-time' )
*     e.g. _time_start=01jun2004, _time_endpp=01sep2004 (if JJA)
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _time_start  = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _time_endpp  = tmp.p
      say '_time_start = ' % _time_start
      say '_time_endpp = ' % _time_endpp
      p = p + 1 ; continue
    endif

*    if( tmp.p = '-time.1' )
    if( tmph = '-time' )
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _time_start.tmpt  = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _time_endpp.tmpt  = tmp.p
      say '_time_start.' % tmpt % ' = ' % _time_start.tmpt
      say '_time_endpp.' % tmpt % ' = ' % _time_endpp.tmpt
      p = p + 1 ; continue
    endif

    if( tmp.p = '-clim' )
      _year = 'clim'
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _year_start = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _year_end   = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _month      = tmp.p
      say _year_start
      say _year_end
      say _month
      p = p + 1 ; continue
    endif

    if( tmph = '-clim' )
      _year.tmpt = 'clim'
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _year_start.tmpt = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _year_end.tmpt   = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _month.tmpt      = tmp.p
      say _year_start.tmpt
      say _year_end.tmpt
      say _month.tmpt
      p = p + 1 ; continue
    endif

    p = p + 1
  endwhile

*  tmp1 = subwrd( tmp, 1 )
*  tmp2 = subwrd( tmp, 2 )
*  tmp3 = subwrd( tmp, 3 )
*  tmp4 = subwrd( tmp, 4 )
*  if( tmp1 = '-ym' )
**   e.g. year=2004, month=6
*    _year  = tmp2
*    _month = tmp3
*    say 'year  = ' % _year
*    say 'month = ' % _month
*  endif
*  if( tmp1 = '-time' )
**   e.g. _time_start=01jun2004, _time_endpp=01sep2004 (if JJA)
*    _time_start  = tmp2
*    _time_endpp  = tmp3
*    say '_time_start = ' % _time_start
*    say '_time_endpp = ' % _time_endpp
*  endif
*  if( tmp1 = '-clim' )
*    _year = 'clim'
*    _year_start = tmp2
*    _year_end   = tmp3
*    _month      = tmp4
*    say _year_start
*    say _year_end
*    say _month
*  endif

***** number of dataset
  dnum = sublin( read( cnf_fname ), 2 )
  say 'dnum = ' % dnum
***** dataset config (X dnum)
  d = 1
  while( d <= dnum )
    dconf.d = sublin( read( cnf_fname ), 2 )
    say 'data #' % d % ': ' % dconf.d
    d = d + 1
  endwhile
***** display (X 6)
  d = 1
  while( d <= 6 )
    _disp.d = sublin( read( cnf_fname ), 2 )
    say 'disp #' % d % ': ' % _disp.d
    d = d + 1
  endwhile
***** save
  _save = sublin( read( cnf_fname ), 2 )

***************************************************************
* Open list
***************************************************************
f = 1
_fmax = dnum
while( f <= _fmax )
  ret = run_list( dconf.f )

  _run.f = subwrd( ret, 2 )
  _var.f = subwrd( ret, 4 )
  if( _var.f = '' )
    say 'error: file (#=' % f % ') does not exist'
    'quit'
  endif
  _f2df.f = last()
  f = f + 1
endwhile


*****

endif
***************************************************************
***************************************************************
***************************************************************


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
      else              ; _yearpp = _yearpp + 1 ; endif
    endif
    term = cmonth( _month )
    _time_start = '01'cm''_year
    _time_endpp = '01'cmpp''_yearpp
  endif
  if( _month = 345 )
    term = 'MAM'
    _time_start = '01mar'_year
    _time_endpp = '01jun'_year
  endif
  if( _month = 678 )
    term = 'JJA'
    _time_start = '01jun'_year
    _time_endpp = '01sep'_year
  endif
  if( _month = 901 )
    term = 'SON'
    _time_start = '01sep'_year
    _time_endpp = '01dec'_year
  endif
  if( _month = 212 )
    term = 'DJF'
    if( _year = '%y' ) ; _yearpp = '%ypp'
    else              ; _yearpp = _year + 1 ; endif
    _time_start = '01dec'_year
    _time_endpp = '01mar'_yearpp
  endif
  if( _month = 999 )
    term = 'ANU'
    if( _year = '%y' ) ; _yearpp = '%ypp'
    else              ; _yearpp = _year + 1 ; endif
    _time_start = '01jan'_year
    _time_endpp = '01jan'_yearpp
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

    _clim_arg.f = _time_start.f % ' ' % _time_end.f % ' ' % _year_start.f % ' ' % _year_end.f
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
* Automatic Variable Setting
***************************************************************
f = 1
while( f <= _fmax )
  if( _varid.f = '_varid.'f | _varid.f = '' ) ; _varid.f = _varid ; endif
  say f % ': ' % _varid.f
  f = f + 1
endwhile

*exit
***************************************************************
* Variable List
***************************************************************
f = 1
while( f <= _fmax )
  sname.f = ''

* varid, varcnf -> name, unit, min, ...
* 1. call get_varcnf without varcnfid (default varcnf will be set)
* 2. load cnf
* 3. call get_varcnf again if varcnfid is set in cnf.

  get_varcnf( f, _varid.f )


  tmp = substr( _varid.f, 1, 5 )
  if( tmp = 'isccp' )
    if( _varid.f = 'isccp_ctp_all' | _varid.f = 'isccp_ctp_all_vis' )
      _name.f = 'Cloud Top Pressure by ISCCP'
      tmp = substr( _varid.f, 7, 20 )
      sname.f = ', ' % tmp
      _unit.f = '%'
      _min2d.f  = 100 ; _int2d.f  = 100 ; _max2d.f  = 900
      _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
      _min1d.f  = 100 ; _int1d.f  = 200 ; _max1d.f  = 900
      _dmin1d.f = -50 ; _dint1d.f = 25 ; _dmax1d.f = 50
      _color.f  = 'white-(0)->grainbow'
      _dcolor.f = 'purple->blue->white->red->brown'
    else ; if( _varid.f = 'isccp_od_all' | _varid.f = 'isccp_od_all_vis' )
      _name.f = 'log(Cloud Optical Depth) by ISCCP'
      tmp = substr( _varid.f, 7, 20 )
      sname.f = ', ' % tmp
      _unit.f = '%'
      _min2d.f  = -1 ; _int2d.f  = 0.5 ; _max2d.f  = 4
      _dmin2d.f = -0.5 ; _dint2d.f = 0.1  ; _dmax2d.f = 0.5
      _min1d.f  = -1 ; _int1d.f  = 1 ; _max1d.f  = 4
      _dmin1d.f = -0.5 ; _dint1d.f = 0.5 ; _dmax1d.f = 0.5
      _color.f  = 'white-(0)->grainbow'
      _dcolor.f = 'purple->blue->white->red->brown'
    else
      _name.f = 'ISCCP Cloud Fraction'
      tmp = substr( _varid.f, 7, 20 )
      sname.f = ', ' % tmp
      _unit.f = '%'
      _min2d.f  = 10  ; _int2d.f  = 10 ; _max2d.f  = 90
      _dmin2d.f = -50 ; _dint2d.f = 10 ; _dmax2d.f = 50
*      _dmin2d.f = -10 ; _dint2d.f = 2 ; _dmax2d.f = 10
      _min1d.f  = 0   ; _int1d.f  = 25 ; _max1d.f  = 100
      _dmin1d.f = -20 ; _dint1d.f = 10 ; _dmax1d.f = 20
*      _dmin1d.f = -10 ; _dint1d.f = 5 ; _dmax1d.f = 10
      _color.f  = 'white-(0)->grainbow'
      _dcolor.f = 'purple->blue->white->red->brown'
*      _dcolor.f = 'white->white->gray'
    endif ; endif
  endif


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
**    'draw string 'xpos' 'ypos' '_time_start.f' <= '_run.f' <= '_time_end.f
*    f = f + 1 
*  endwhile
*endif



***************************************************************
* Calculate
***************************************************************
f = 1
while( f <= _fmax )
  say 'Processing #'f
  'set dfile '_f2df.f
  'set lat 'latmin' 'latmax
  'set lon 'lonmin' 'lonmax
  'set z 1'
  'set t 1'
  if( _time_start.f != '' & _time_end.f != '' )
    say 'v'f' = ave( '_var.f', time='_time_start.f', time='_time_end.f' )'
    'v'f' = ave( '_var.f', time='_time_start.f', time='_time_end.f' )'
  endif

  if( _clim_arg.f != '' )
*    'clave2 '_var.f' '_clim_arg.f' v'f
    say 'clave '_var.f' '_clim_arg.f' v'f
    'clave '_var.f' '_clim_arg.f' v'f
  endif

  f = f + 1
endwhile


***************************************************************
* Draw
***************************************************************
d = 1
while( d <= 6 )
  i = 1
  j = 4-d
  if( j <= 0 ) ; i = 2 ; j = j + 3 ; endif

  xo = -0.2 ; yo = 0.1
  xwid = ''
  'mul 2 3 'i' 'j' -xoffset 'xo' -yoffset 'yo' 'xwid
  'set grads off'
  'set mpdraw '_mpdraw

  f1 = subwrd( _disp.d, 1 )
  f2 = subwrd( _disp.d, 2 )

  if( f1 = '' ) ; d = d + 1 ; continue ;  endif
  'set dfile '_f2df.f1
  'set z 1'
*  'set dfile 'f1

  'shade const(v'f1',0,-u) -1e+30 1e+30 150 150 150'

***** raw data *****
  if( f2 = '' )
*    'color -kind '_color' '_min2d' '_max2d' '_int2d
    'color -kind '_color.f1' '_min2d.f1' '_max2d.f1' '_int2d.f1
    'v = v'f1
  else
*    'color -kind '_dcolor' '_dmin2d' '_dmax2d' '_dint2d
    'color -kind '_dcolor.f1' '_dmin2d.f1' '_dmax2d.f1' '_dint2d.f1
    'v = v'f1' - lterp( v'f2', v'f1' )'
  endif

  'd v'
  if( _cbar.i = d )
    xposmin = 5.0 * i - 3.6
    xposmax = xposmin + 4.3
    'q shades'
    if( sublin(result,1) != 'None' )
      'xcbar 'xposmin' 'xposmax' 0.4 0.6 -edge triangle -line on -fstep 2'
    endif
  endif

  if( _cont.d = 'on' )
      'set gxout contour'; 'set cthick 6'; 'set ccolor 1'
    if( f2 = '' )
*      'set cint '_int2d
      'set cint '_int2d.f1
    else
*      'set cint '_dint2d
      'set cint '_dint2d.f1
    endif
    'd v'
  endif

  'setfont small'
  if( f2 = '' ) ; 'draws ('_run.f1')' % sname.f1
  else ; 'draws ('_run.f1') - ('_run.f2')' % sname.f1 ; endif

*  if( d = 1 )
*    'setfont normal'
    'setfont normal -base tl'
    'draw string 1.4 8.4 '_name.f1' for 'term' '_year' ['_unit.f1']'
*  endif

*** zonal mean ***

  ypos = 2.5 * j - 1.6
  if( i = 1 ) ; 'set parea 4.8 5.8 'ypos' 'ypos+2.0 ; endif
  if( i = 2 ) ; 'set parea 9.8 10.8 'ypos' 'ypos+2.0 ; endif

  'set xyrev on'
*  if( f2 = '' ) ; 'set vrange '_min1d' '_max1d ; 'set xlint '_int1d
  if( f2 = '' ) ; 'set vrange '_min1d.f1' '_max1d.f1 ; 'set xlint '_int1d.f1
*  else ; 'set vrange '_dmin1d' '_dmax1d ; 'set xlint '_dint1d ; endif
  else ; 'set vrange '_dmin1d.f1' '_dmax1d.f1 ; 'set xlint '_dint1d.f1 ; endif
  'set ylab off'
  'set cmark 0' ; 'set cthick 6' ; 'set ccolor 1'
  'zm = ave( v, lon='lonmin', lon='lonmax', -b )'
  'd zm'
  'set ylab on'


  'setfont normal -angle 270'
  'gm = aave( v, lon='lonmin', lon='lonmax', lat='latmin', lat='latmax' )'
  gm = v2s( 'gm' )
  'draws -pos tr -base tl -xoffset -0.1 -yoffset -0.5 -color 1 'math_format('%.2f',gm)
  'setfont normal -angle 0'


****** diff data *****
*  else
*    'set dfile 'f2
*    'set lev '_levmin' '_levmax
*    'set lat 'latmin' 'latmax
*    'set lon 0'
*    'set t 1'
*
**    diff( 'v'f2, f2, 'v'f1, f1, 'd' )
*    'd = v'f1' - lterp( v'f2', v'f1' )'
*    'color '_dmin' '_dmax' '_dint' -kind '_dcolor
*    'd d'
*
*    xpos = 3.5 * i - 2.7
*    ypos = 4.0 * j - 3.5
*    'xcbar 'xpos' 'xpos+3.0' 'ypos' 'ypos+0.15' -line on -fstep 2 -foffset 1 -fwidth 0.08 -fheight 0.08'
*    'set gxout contour'; 'set cint '_dint;  'set cthick 6'; 'set ccolor 1'
*    'd d'
*
*    'setfont small'
*    'draws ('_run.f1') - ('_run.f2')'
*
*  endif


  d = d + 1
endwhile



if( _save != '_save' & _save != '' )
  'save '_save
endif

cmd_fin
exit


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

  if( varid = 'iwp' )
    _name.f = 'Ice Water Path'
    _unit.f = 'g/m^2'
    _min2d.f  = 20  ; _int2d.f  = 20  ; _max2d.f  = 200
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 0   ; _int1d.f  = 100 ; _max1d.f  = 200
    _dmin1d.f = -40 ; _dint1d.f = 20  ; _dmax1d.f = 40
    _color.f  = 'grainbow'
    _dcolor.f = 'bluered'
    if( varcnfid = '2' )
      _min2d.f  = 0    ; _int2d.f  = 40 ; _max2d.f  = 400
      _dmin2d.f = -200 ; _dint2d.f = 40 ; _dmax2d.f = 200
    endif
  endif

  if( varid = 'lwp' )
    _name.f = 'Liquid Water Path'
    _unit.f = 'g/m^2'
    _min2d.f  = 20  ; _int2d.f  = 20  ; _max2d.f  = 200
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 0   ; _int1d.f  = 100 ; _max1d.f  = 200
    _dmin1d.f = -40 ; _dint1d.f = 20  ; _dmax1d.f = 40
    _color.f  = 'grainbow'
    _dcolor.f = 'bluered'
    if( varcnfid = '2' )
      _min2d.f  = 0    ; _int2d.f  = 40 ; _max2d.f  = 400
      _dmin2d.f = -200 ; _dint2d.f = 40 ; _dmax2d.f = 200
    endif
  endif

  if( varid = 'pt_700_minus_925' )
    _name.f = '`3z`0`b700`n-`3z`0`b925`n'
    _unit.f = 'K'
    _min2d.f  = 10 ; _int2d.f  = 2   ; _max2d.f  = 30
    _dmin2d.f = -5 ; _dint2d.f = 1   ; _dmax2d.f = 5
    _min1d.f  = 10 ; _int1d.f  = 5   ; _max1d.f  = 30
    _dmin1d.f = -5 ; _dint1d.f = 2.5 ; _dmax1d.f = 5
    _color.f  = 'grainbow'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'pt_z3000s_minus_z500s' )
    _name.f = '`3z`0`b700`n-`3z`0`b925`n'
    _unit.f = 'K'
    _min2d.f  = 10 ; _int2d.f  = 2   ; _max2d.f  = 30
    _dmin2d.f = -5 ; _dint2d.f = 1   ; _dmax2d.f = 5
    _min1d.f  = 10 ; _int1d.f  = 5   ; _max1d.f  = 30
    _dmin1d.f = -5 ; _dint1d.f = 2.5 ; _dmax1d.f = 5
    _color.f  = 'grainbow'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'precip' )
    _name.f = 'Precipitation'
    _unit.f = 'mm/day'
    _min2d.f  = 1   ; _int2d.f  = 1 ; _max2d.f  = 20
    _dmin2d.f = -10 ; _dint2d.f = 1 ; _dmax2d.f = 10
    _min1d.f  = 0   ; _int1d.f  = 3 ; _max1d.f  = 15
    _dmin1d.f = -6  ; _dint1d.f = 2 ; _dmax1d.f = 6
*    _color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    _color.f  = 'white-(0)->grainbow'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'qv2m' )
    _name.f = '2m Specif Humidity'
    _unit.f = 'g/kg'
    _min2d.f  = 2  ; _int2d.f  = 2   ; _max2d.f  = 20
    _dmin2d.f = -2 ; _dint2d.f = 0.4 ; _dmax2d.f = 2
    _min1d.f  = 0  ; _int1d.f  = 5   ; _max1d.f  = 20
    _dmin1d.f = -2 ; _dint1d.f = 1   ; _dmax1d.f = 2
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid_base = 'qv' & valnum(varid_lev) != 0 )
    _name.f = 'Specif Humidity @ 'varid_lev'hPa'
    _unit.f = 'g/kg'
    _min2d.f  = 2  ; _int2d.f  = 2   ; _max2d.f  = 20
    _dmin2d.f = -5 ; _dint2d.f = 1   ; _dmax2d.f = 5
    _min1d.f  = 0  ; _int1d.f  = 5   ; _max1d.f  = 20
    _dmin1d.f = -5 ; _dint1d.f = 1   ; _dmax1d.f = 5
    if( varid_lev <= 500 )
      _min2d.f  = 1    ; _int2d.f  = 1   ; _max2d.f  = 10
      _dmin2d.f = -2.5 ; _dint2d.f = 0.5 ; _dmax2d.f = 2.5
      _min1d.f  = 0    ; _int1d.f  = 2.5 ; _max1d.f  = 10
      _dmin1d.f = -2   ; _dint1d.f = 1   ; _dmax1d.f = 2
    endif
    if( varid_lev <= 300 )
      _min2d.f  = 0.2  ; _int2d.f  = 0.2  ; _max2d.f  = 2.0
      _dmin2d.f = -0.5 ; _dint2d.f = 0.1  ; _dmax2d.f = 0.5
      _min1d.f  = 0    ; _int1d.f  = 0.5  ; _max1d.f  = 2.0
      _dmin1d.f = -0.5 ; _dint1d.f = 0.25 ; _dmax1d.f = 0.5
    endif
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid_base = 'rh' & valnum(varid_lev) != 0 )
    _name.f = 'Relative Humidity @ 'varid_lev'hPa'
    _unit.f = '%'
    _min2d.f  = 10  ; _int2d.f  = 10 ; _max2d.f  = 100
    _dmin2d.f = -50 ; _dint2d.f = 10 ; _dmax2d.f = 50
    _min1d.f  = 0   ; _int1d.f  = 25 ; _max1d.f  = 100
    _dmin1d.f = -20 ; _dint1d.f = 10 ; _dmax1d.f = 20
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 't2m' )
    _name.f = '2m Temperature'
    _unit.f = 'K'
    _min2d.f  = 200 ; _int2d.f  = 10 ; _max2d.f  = 320
    _dmin2d.f = -10 ; _dint2d.f = 1  ; _dmax2d.f = 10
    _min1d.f  = 220 ; _int1d.f  = 30 ; _max1d.f  = 310
    _dmin1d.f = -6  ; _dint1d.f = 3  ; _dmax1d.f = 6
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid_base = 't' & valnum(varid_lev) != 0 )
    _name.f = 'Temperature @ 'varid_lev'hPa'
    _unit.f = '%'
    _min2d.f  = 220 ; _int2d.f  = 5  ; _max2d.f  = 300
    _dmin2d.f = -10 ; _dint2d.f = 1  ; _dmax2d.f = 10
    _min1d.f  = 220 ; _int1d.f  = 30 ; _max1d.f  = 300
    _dmin1d.f = -6  ; _dint1d.f = 3  ; _dmax1d.f = 6
    if( varid_lev <= 500 )
      _min2d.f  = 200 ; _int2d.f  = 5  ; _max2d.f  = 280
      _dmin2d.f = -10 ; _dint2d.f = 1  ; _dmax2d.f = 10
      _min1d.f  = 200 ; _int1d.f  = 30 ; _max1d.f  = 280
      _dmin1d.f = -6  ; _dint1d.f = 3  ; _dmax1d.f = 6
    endif
    if( varid_lev <= 300 )
      _min2d.f  = 180 ; _int2d.f  = 5  ; _max2d.f  = 260
      _dmin2d.f = -10 ; _dint2d.f = 1  ; _dmax2d.f = 10
      _min1d.f  = 180 ; _int1d.f  = 30 ; _max1d.f  = 260
      _dmin1d.f = -6  ; _dint1d.f = 3  ; _dmax1d.f = 6
    endif
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'sst' )
    _name.f = 'Sea Surface Temperature'
    _unit.f = 'K'
    _min2d.f  = 273 ; _int2d.f  = 3   ; _max2d.f  = 306
    _dmin2d.f = -3  ; _dint2d.f = 0.5 ; _dmax2d.f = 3
    _min1d.f  = 270 ; _int1d.f  = 10  ; _max1d.f  = 306
    _dmin1d.f = -3  ; _dint1d.f = 1.5 ; _dmax1d.f = 3
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'mslp' )
    _name.f = 'MSLP'
    _unit.f = 'hPa'
    _min2d.f  = 1000 ; _int2d.f  = 2 ; _max2d.f  = 1030
*    _dmin2d.f = -10  ; _dint2d.f = 2 ; _dmax2d.f = 10
    _dmin2d.f = -5   ; _dint2d.f = 1 ; _dmax2d.f = 5
    _min1d.f  = 1005 ; _int1d.f  = 5 ; _max1d.f  = 1025
    _dmin1d.f = -10  ; _dint1d.f = 5 ; _dmax1d.f = 10
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'icr' )
    _name.f = 'Sea Ice Fraction'
    _unit.f = '%'
    _min2d.f  = 10  ; _int2d.f  = 10 ; _max2d.f  = 90
    _dmin2d.f = -25 ; _dint2d.f = 5  ; _dmax2d.f = 25
    _min1d.f  = 0   ; _int1d.f  = 25 ; _max1d.f  = 100
    _dmin1d.f = -50 ; _dint1d.f = 25 ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'ice' )
    _name.f = 'Sea Ice Mass'
    _unit.f = 'kg/m`a2`n'
    _min2d.f  = 200  ; _int2d.f  = 200 ; _max2d.f  = 2000
    _dmin2d.f = -100 ; _dint2d.f = 10  ; _dmax2d.f = 100
    _min1d.f  = 0    ; _int1d.f  = 500 ; _max1d.f  = 2000
    _dmin1d.f = -500 ; _dint1d.f = 100 ; _dmax1d.f = 500
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid_base = 'u' & valnum(varid_lev) != 0 )
    _name.f = 'Zonal Wind @ 'varid_lev'hPa'
    _unit.f = 'm/s'
    _min2d.f  = -30 ; _int2d.f  = 5  ; _max2d.f  = 30
    _dmin2d.f = -10 ; _dint2d.f = 2  ; _dmax2d.f = 10
    _min1d.f  = -30 ; _int1d.f  = 15 ; _max1d.f  = 30
    _dmin1d.f = -10 ; _dint1d.f = 5  ; _dmax1d.f = 10
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'lw_up_toa' | varid = 'lw_up_clr_toa' )
    _name.f = 'Upward Longwave Radiation @ TOA'
    if( varid = 'lw_up_clr_toa' ) ; _name.f = _name.f % ' (Clear Sky)' ; endif
    _unit.f = 'W/m^2'
    _min2d.f  = 100 ; _int2d.f  = 20  ; _max2d.f  = 340
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 100 ; _int1d.f  = 50  ; _max1d.f  = 300
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'lw_crf_toa' )
    _name.f = 'Longwave Cloud Radiative Forcing @ TOA'
    _unit.f = 'W/m^2'
    _min2d.f  = -100 ; _int2d.f  = 20  ; _max2d.f  = 100
    _dmin2d.f = -50  ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = -100 ; _int1d.f  = 50  ; _max1d.f  = 100
    _dmin1d.f = -50  ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'lw_up_sfc' )
    _name.f = 'Upward Longwave Radiation @ Surface'
    _unit.f = 'W/m^2'
    _min2d.f  = 100 ; _int2d.f  = 30  ; _max2d.f  = 480
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 100 ; _int1d.f  = 200 ; _max1d.f  = 500
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'lw_down_sfc' )
    _name.f = 'Downward Longwave Radiation @ Surface'
    _unit.f = 'W/m^2'
    _min2d.f  = 100 ; _int2d.f  = 30  ; _max2d.f  = 480
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 100 ; _int1d.f  = 200 ; _max1d.f  = 500
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'sw_up_toa' | varid = 'sw_up_clr_toa' )
    _name.f = 'Upward Shortwave Radiation @ TOA'
    if( varid = 'sw_up_clr_toa' ) ; _name.f = _name.f % ' (Clear Sky)' ; endif
    _unit.f = 'W/m^2'
    _min2d.f  = 0   ; _int2d.f  = 40  ; _max2d.f  = 400
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 0   ; _int1d.f  = 100 ; _max1d.f  = 300
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'sw_crf_toa' )
    _name.f = 'Shortwave Cloud Radiative Forcing @ TOA'
    _unit.f = 'W/m^2'
    _min2d.f  = -100 ; _int2d.f  = 20  ; _max2d.f  = 100
    _dmin2d.f = -50  ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = -100 ; _int1d.f  = 50  ; _max1d.f  = 100
    _dmin1d.f = -50  ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'sw_up_sfc' )
    _name.f = 'Upward Shortwave Radiation @ Surface'
    _unit.f = 'W/m^2'
    _min2d.f  = 0   ; _int2d.f  = 20  ; _max2d.f  = 200
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 0   ; _int1d.f  = 100 ; _max1d.f  = 200
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'sw_down_toa' )
    _name.f = 'Downward Shortwave Radiation @ TOA'
    _unit.f = 'W/m^2'
    _min2d.f  = 0   ; _int2d.f  = 50  ; _max2d.f  = 500
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 0   ; _int1d.f  = 250 ; _max1d.f  = 500
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
*    _color.f  = 'grainbow'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'sw_down_sfc' )
    _name.f = 'Downward Shortwave Radiation @ Surface'
    _unit.f = 'W/m^2'
    _min2d.f  = 0   ; _int2d.f  = 40  ; _max2d.f  = 400
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 0   ; _int1d.f  = 100 ; _max1d.f  = 400
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
*    _color.f  = 'grainbow'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'sw_net_toa' )
    _name.f = 'Down-Upward Shortwave Radiation @ TOA'
    _unit.f = 'W/m^2'
    _min2d.f  = 0   ; _int2d.f  = 40  ; _max2d.f  = 400
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 0   ; _int1d.f  = 100 ; _max1d.f  = 300
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'lw_net_sfc' )
    _name.f = 'Down-Upward Longwave Radiation @ Surface'
    _unit.f = 'W/m^2'
    _min2d.f  = -200; _int2d.f  = 20  ; _max2d.f  = 0
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = -100; _int1d.f  = 50  ; _max1d.f  = 0
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'sw_net_sfc' )
    _name.f = 'Down-Upward Shortwave Radiation @ Surface'
    _unit.f = 'W/m^2'
    _min2d.f  = 0   ; _int2d.f  = 40  ; _max2d.f  = 400
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = 0   ; _int1d.f  = 100 ; _max1d.f  = 300
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'aw_net_toa' )
    _name.f = 'Down-Upward Long+Shortwave Radiation @ TOA'
    _unit.f = 'W/m^2'
    _min2d.f  = -200; _int2d.f  = 40  ; _max2d.f  = 200
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = -200; _int1d.f  = 100 ; _max1d.f  = 200
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'aw_crf_toa' )
    _name.f = 'Long+Shortwave Cloud Radiative Forcing @ TOA'
    _unit.f = 'W/m^2'
    _min2d.f  = -100 ; _int2d.f  = 20  ; _max2d.f  = 100
    _dmin2d.f = -50  ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = -100 ; _int1d.f  = 50  ; _max1d.f  = 100
    _dmin1d.f = -50  ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'aw_net_sfc' )
    _name.f = 'Down-Upward Long+Shortwave Radiation @ Surface'
    _unit.f = 'W/m^2'
    _min2d.f  = -200; _int2d.f  = 40  ; _max2d.f  = 200
    _dmin2d.f = -50 ; _dint2d.f = 10  ; _dmax2d.f = 50
    _min1d.f  = -200; _int1d.f  = 100 ; _max1d.f  = 200
    _dmin1d.f = -50 ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _dcolor.f = 'bluered'
  endif

  if( varid = 'sh_sfc' | varid = 'lh_sfc' )
    if( varid = 'sh_sfc' ) ; _name.f = 'Surface Sensible Heat Flux' ; endif
    if( varid = 'lh_sfc' ) ; _name.f = 'Surface Latent Heat Flux'   ; endif
    _unit.f = 'W/m^2'
    _min2d.f  = -200 ; _int2d.f  = 40  ; _max2d.f  = 200
    _dmin2d.f = -100 ; _dint2d.f = 20  ; _dmax2d.f = 100
    _min1d.f  = -200 ; _int1d.f  = 100 ; _max1d.f  = 200
    _dmin1d.f = -50  ; _dint1d.f = 25  ; _dmax1d.f = 50
*    _color.f  = 'purple->blue->aqua->lime->yellow->red->maroon'
    _color.f  = 'purple->bluered->maroon'
*    _dcolor.f = 'bluered'
    _dcolor.f = 'purple->bluered->maroon'
  endif

  if( varid = 'energy_net_sfc' )
    _name.f = 'Net Downward Surface Energy Flux'
    _unit.f = 'W/m^2'
    _min2d.f  = -200 ; _int2d.f  = 40  ; _max2d.f  = 200
    _dmin2d.f = -100 ; _dint2d.f = 20  ; _dmax2d.f = 100
    _min1d.f  = -200 ; _int1d.f  = 100 ; _max1d.f  = 200
    _dmin1d.f = -50  ; _dint1d.f = 25  ; _dmax1d.f = 50
    _color.f  = 'purple->bluered->maroon'
    _dcolor.f = 'purple->bluered->maroon'
  endif

  if( varid = 'land_wg_z1' | varid = 'land_wg_z2' | varid = 'land_wg_z3' | varid = 'land_wg_z4' | varid = 'land_wg_z5' )
    if( varid = 'land_wg_z1' ) ; _name.f = 'Soil Water @ z=1' ; endif
    if( varid = 'land_wg_z2' ) ; _name.f = 'Soil Water @ z=2' ; endif
    if( varid = 'land_wg_z3' ) ; _name.f = 'Soil Water @ z=3' ; endif
    if( varid = 'land_wg_z4' ) ; _name.f = 'Soil Water @ z=4' ; endif
    if( varid = 'land_wg_z5' ) ; _name.f = 'Soil Water @ z=5' ; endif
    _unit.f = '0-1'
    _min2d.f  = 0    ; _int2d.f  = 0.1 ; _max2d.f  = 1
    _dmin2d.f = -0.5 ; _dint2d.f = 0.1 ; _dmax2d.f = 0.5
    _min1d.f  = 0    ; _int1d.f  = 0.5 ; _max1d.f  = 1
    _dmin1d.f = -0.5 ; _dint1d.f = 0.1 ; _dmax1d.f = 0.5
    _color.f  = 'grainbow'
    _dcolor.f = 'purple->bluered->maroon'
  endif

return

