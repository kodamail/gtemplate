function latlon( args )
'reinit'

* TODO: support mask for ISCCP topography

'!pwd > pwd.tmp'
ret = read( 'pwd.tmp' )
pwd = sublin( ret, 2 )
'!rm -f pwd.tmp'
gs = pwd'/latlon.gs'
rc = gsfallow( 'on' )

'set line 0'
'draw rec 0 0 11 8.5'

sw = subwrd( args, 1 )
***************************************************************
***************************************************************
***************************************************************
if( sw != 'cnf' )
  cnf = sw

* set default values
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
    prex( 'clave '_var.f' '_clim_arg.f' v'f )
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
*  if( _cbar.i = d )
*    xposmin = 5.0 * i - 3.6
*    xposmax = xposmin + 4.3
*    'q shades'
*    if( sublin(result,1) != 'None' )
*      'xcbar 'xposmin' 'xposmax' 0.4 0.6 -edge triangle -line on -fstep 2'
*    endif
*  endif
  if( _cbar.d = 'hor' )
    if( d <= 3 ) ; xposmin = 1.4
    else         ; xposmin = 6.4 ; endif
    xposmax = xposmin + 4.3
    yposmin = 0.4 + (j-1) * 2.5
    yposmax = yposmin + 0.2
    'q shades'
    if( sublin(result,1) != 'None' )
      'xcbar 'xposmin' 'xposmax' 'yposmin' 'yposmax' -edge triangle -line on -fstep 2'
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
*    'draw string 1.4 8.4 '_name.f1' for 'term' '_year' ['_unit.f1']'
    'draw string 1.4 8.4 '_name.f1' for 'term' ['_unit.f1']'
*  endif

*** zonal mean ***
  if( _region = '' | _region = 'global' | _region = '_region' )
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
  endif

*** global mean ***
  'gm = aave( v, lon='lonmin', lon='lonmax', lat='latmin', lat='latmax' )'
  gm = v2s( 'gm' )
  if( _region = '' | _region = 'global' | _region = '_region' )
    'setfont normal -angle 270'
    'draws -pos tr -base tl -xoffset -0.1 -yoffset -0.5 -color 1 'math_format('%.2f',gm)
    'setfont normal -angle 0'
  else
    'draws -pos tr -color 1 'math_format('%.2f',gm)
  endif



  d = d + 1
endwhile


if( _save != '_save' & _save != '' )
*  'save '_save
  'gxprint '_save'.eps white'
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

  if( varid = 'land_wg_z1' | varid = 'land_wg_z2' | varid = 'land_wg_z3' | varid = 'land_wg_z4' | varid = 'land_wg_z5' )
    if( varid = 'land_wg_z1' ) ; name = 'Soil Water @ z=1' ; endif
    if( varid = 'land_wg_z2' ) ; name = 'Soil Water @ z=2' ; endif
    if( varid = 'land_wg_z3' ) ; name = 'Soil Water @ z=3' ; endif
    if( varid = 'land_wg_z4' ) ; name = 'Soil Water @ z=4' ; endif
    if( varid = 'land_wg_z5' ) ; name = 'Soil Water @ z=5' ; endif
    unit = '0-1'
    min2d  = 0    ; int2d  = 0.1 ; max2d  = 1
    dmin2d = -0.5 ; dint2d = 0.1 ; dmax2d = 0.5
    min1d  = 0    ; int1d  = 0.5 ; max1d  = 1
    dmin1d = -0.5 ; dint1d = 0.1 ; dmax1d = 0.5
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

  if( varid = 'mslp' )
    name = 'MSLP'
    unit = 'hPa'
    min2d  = 1000 ; int2d  = 2 ; max2d  = 1030
*    dmin2d = -10  ; dint2d = 2 ; dmax2d = 10
    dmin2d = -5   ; dint2d = 1 ; dmax2d = 5
    min1d  = 1005 ; int1d  = 5 ; max1d  = 1025
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

return
