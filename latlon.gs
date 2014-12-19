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

* _varid -> _varid_base, _varid_lev
  target.1 = 'u'
  target.2 = 'v'
  target.3 = 't'
  target.4 = 'rh'
  target.5 = 'qv'
  tarmax = 5

  tar = 1
  while( tar <= tarmax )
    target_len = math_strlen(target.tar)
    tmp1 = substr(_varid.f,1,target_len)
    tmp2 = math_strlen(_varid.f)
    if( tmp1 = target.tar & tmp2 > target_len )
      _varid_base = tmp1
      _varid_lev = substr(_varid.f,target_len+1,tmp2-target_len)
    endif
    tar = tar + 1
  endwhile

* variable
  if( _varid.f = 'iwp' )
    name.f = 'Ice Water Path'
    unit.f = 'g/m^2'
*    min2d.f  = 0 ; int2d.f  = 40   ; max2d.f  = 400
*    dmin2d.f = -200; dint2d.f = 40  ; dmax2d.f = 200
    min2d.f  = 20 ; int2d.f  = 20   ; max2d.f  = 200
    dmin2d.f = -50; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -40 ; dint1d.f = 20  ; dmax1d.f = 40
    color.f = 'grainbow'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'lwp' )
    name.f = 'Liquid Water Path'
    unit.f = 'g/m^2'
*    min2d.f  = 0   ; int2d.f  = 40  ; max2d.f  = 400
*    dmin2d.f = -200; dint2d.f = 40  ; dmax2d.f = 200
    min2d.f  = 20 ; int2d.f  = 20   ; max2d.f  = 200
    dmin2d.f = -50; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -40 ; dint1d.f = 20  ; dmax1d.f = 40
    color.f = 'grainbow'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'pt_700_minus_925' )
    name.f = '`3z`0`b700`n-`3z`0`b925`n'
    unit.f = 'K'
    min2d.f  = 10 ; int2d.f  = 2 ; max2d.f  = 30
    dmin2d.f = -5 ; dint2d.f = 1 ; dmax2d.f = 5
    min1d.f  = 10 ; int1d.f  = 5 ; max1d.f  = 30
    dmin1d.f = -5 ; dint1d.f = 2.5 ; dmax1d.f = 5
    color.f = 'grainbow'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'pt_z3000s_minus_z500s' )
    name.f = '`3z`0`b700`n-`3z`0`b925`n'
    unit.f = 'K'
    min2d.f  = 10 ; int2d.f  = 2 ; max2d.f  = 30
    dmin2d.f = -5 ; dint2d.f = 1 ; dmax2d.f = 5
    min1d.f  = 10 ; int1d.f  = 5 ; max1d.f  = 30
    dmin1d.f = -5 ; dint1d.f = 2.5 ; dmax1d.f = 5
    color.f = 'grainbow'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'precip' )
    name.f = 'Precipitation'
    unit.f = 'mm/day'
    min2d.f  = 1   ; int2d.f  = 1 ; max2d.f  = 20
    dmin2d.f = -10 ; dint2d.f = 1 ; dmax2d.f = 10
    min1d.f  = 0   ; int1d.f  = 3 ; max1d.f  = 15
    dmin1d.f = -6  ; dint1d.f = 2 ; dmax1d.f = 6
*    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    color.f = 'white-(0)->grainbow'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'qv2m' )
    name.f = '2m Specif Humidity'
    unit.f = 'g/kg'
    min2d.f  = 2  ; int2d.f  = 2   ; max2d.f  = 20
    dmin2d.f = -2 ; dint2d.f = 0.4 ; dmax2d.f = 2
    min1d.f  = 0  ; int1d.f  = 5   ; max1d.f  = 20
    dmin1d.f = -2 ; dint1d.f = 1   ; dmax1d.f = 2
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid_base = 'qv' & valnum(_varid_lev) != 0 )
    name.f = 'Specif Humidity @ '_varid_lev'hPa'
    unit.f = 'g/kg'
    min2d.f  = 2  ; int2d.f  = 2   ; max2d.f  = 20
    dmin2d.f = -5 ; dint2d.f = 1   ; dmax2d.f = 5
    min1d.f  = 0  ; int1d.f  = 5   ; max1d.f  = 20
    dmin1d.f = -5 ; dint1d.f = 1   ; dmax1d.f = 5
    if( _varid_lev <= 500 )
      min2d.f  = 1    ; int2d.f  = 1   ; max2d.f  = 10
      dmin2d.f = -2.5 ; dint2d.f = 0.5 ; dmax2d.f = 2.5
      min1d.f  = 0    ; int1d.f  = 2.5 ; max1d.f  = 10
      dmin1d.f = -2   ; dint1d.f = 1   ; dmax1d.f = 2
    endif
    if( _varid_lev <= 300 )
      min2d.f  = 0.2  ; int2d.f  = 0.2  ; max2d.f  = 2.0
      dmin2d.f = -0.5 ; dint2d.f = 0.1  ; dmax2d.f = 0.5
      min1d.f  = 0    ; int1d.f  = 0.5  ; max1d.f  = 2.0
      dmin1d.f = -0.5 ; dint1d.f = 0.25 ; dmax1d.f = 0.5
    endif
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid_base = 'rh' & valnum(_varid_lev) != 0 )
    name.f = 'Relative Humidity @ '_varid_lev'hPa'
    unit.f = '%'
    min2d.f  = 10  ; int2d.f  = 10 ; max2d.f  = 100
    dmin2d.f = -50 ; dint2d.f = 10 ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 25 ; max1d.f  = 100
    dmin1d.f = -20 ; dint1d.f = 10 ; dmax1d.f = 20
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 't2m' )
    name.f = '2m Temperature'
    unit.f = 'K'
    min2d.f  = 200 ; int2d.f  = 10 ; max2d.f  = 320
    dmin2d.f = -10 ; dint2d.f = 1  ; dmax2d.f = 10
    min1d.f  = 220 ; int1d.f  = 30 ; max1d.f  = 310
    dmin1d.f = -6  ; dint1d.f = 3  ; dmax1d.f = 6
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid_base = 't' & valnum(_varid_lev) != 0 )
    name.f = 'Temperature @ '_varid_lev'hPa'
    unit.f = '%'
    min2d.f  = 220 ; int2d.f  = 5 ; max2d.f  = 300
    dmin2d.f = -10 ; dint2d.f = 1  ; dmax2d.f = 10
    min1d.f  = 220 ; int1d.f  = 30 ; max1d.f  = 300
    dmin1d.f = -6  ; dint1d.f = 3  ; dmax1d.f = 6
    if( _varid_lev <= 500 )
      min2d.f  = 200 ; int2d.f  = 5 ; max2d.f  = 280
      dmin2d.f = -10 ; dint2d.f = 1  ; dmax2d.f = 10
      min1d.f  = 200 ; int1d.f  = 30 ; max1d.f  = 280
      dmin1d.f = -6  ; dint1d.f = 3  ; dmax1d.f = 6
    endif
    if( _varid_lev <= 300 )
      min2d.f  = 180 ; int2d.f  = 5 ; max2d.f  = 260
      dmin2d.f = -10 ; dint2d.f = 1  ; dmax2d.f = 10
      min1d.f  = 180 ; int1d.f  = 30 ; max1d.f  = 260
      dmin1d.f = -6  ; dint1d.f = 3  ; dmax1d.f = 6
    endif
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'sst' )
    name.f = 'Sea Surface Temperature'
    unit.f = 'K'
    min2d.f  = 273 ; int2d.f  = 3 ; max2d.f  = 306
    dmin2d.f = -3  ; dint2d.f = 0.5  ; dmax2d.f = 3
    min1d.f  = 270 ; int1d.f  = 10 ; max1d.f  = 306
    dmin1d.f = -3  ; dint1d.f = 1.5  ; dmax1d.f = 3
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'mslp' )
    name.f = 'MSLP'
    unit.f = 'hPa'
    min2d.f  = 1000  ; int2d.f  = 2   ; max2d.f  = 1030
*    dmin2d.f = -10 ; dint2d.f = 2 ; dmax2d.f = 10
    dmin2d.f = -5 ; dint2d.f = 1 ; dmax2d.f = 5
    min1d.f  = 1005  ; int1d.f  = 5   ; max1d.f  = 1025
    dmin1d.f = -10 ; dint1d.f = 5   ; dmax1d.f = 10
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'icr' )
    name.f = 'Sea Ice Fraction'
    unit.f = '%'
    min2d.f  = 10 ; int2d.f  = 10 ; max2d.f  = 90
    dmin2d.f = -25  ; dint2d.f = 5  ; dmax2d.f = 25
    min1d.f  = 0 ; int1d.f  = 25 ; max1d.f  = 100
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'ice' )
    name.f = 'Sea Ice Mass'
    unit.f = 'kg/m`a2`n'
    min2d.f  = 200 ; int2d.f  = 200 ; max2d.f  = 2000
    dmin2d.f = -100  ; dint2d.f = 10  ; dmax2d.f = 100
    min1d.f  = 0 ; int1d.f  = 500 ; max1d.f  = 2000
    dmin1d.f = -500  ; dint1d.f = 100  ; dmax1d.f = 500
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid_base = 'u' & valnum(_varid_lev) != 0 )
    name.f = 'Zonal Wind @ '_varid_lev'hPa'
    unit.f = 'm/s'
    min2d.f  = -30 ; int2d.f  = 5  ; max2d.f  = 30
    dmin2d.f = -10 ; dint2d.f = 2  ; dmax2d.f = 10
    min1d.f  = -30 ; int1d.f  = 15 ; max1d.f  = 30
    dmin1d.f = -10 ; dint1d.f = 5  ; dmax1d.f = 10
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'lw_up_toa' | _varid.f = 'lw_up_clr_toa' )
    name.f = 'Upward Longwave Radiation @ TOA'
    if( _varid.f = 'lw_up_clr_toa' ) ; name.f = name.f % ' (Clear Sky)' ; endif
    unit.f = 'W/m^2'
    min2d.f  = 100 ; int2d.f  = 20  ; max2d.f  = 340
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 100 ; int1d.f  = 50  ; max1d.f  = 300
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'lw_crf_toa' )
    name.f = 'Longwave Cloud Radiative Forcing @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = -100 ; int2d.f  = 20  ; max2d.f  = 100
    dmin2d.f = -50  ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -100 ; int1d.f  = 50  ; max1d.f  = 100
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'lw_up_sfc' )
    name.f = 'Upward Longwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = 100 ; int2d.f  = 30  ; max2d.f  = 480
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 100 ; int1d.f  = 200 ; max1d.f  = 500
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'lw_down_sfc' )
    name.f = 'Downward Longwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = 100 ; int2d.f  = 30  ; max2d.f  = 480
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 100 ; int1d.f  = 200 ; max1d.f  = 500
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'sw_up_toa' | _varid.f = 'sw_up_clr_toa' )
    name.f = 'Upward Shortwave Radiation @ TOA'
    if( _varid.f = 'sw_up_clr_toa' ) ; name.f = name.f % ' (Clear Sky)' ; endif
    unit.f = 'W/m^2'
    min2d.f  = 0   ; int2d.f  = 40  ; max2d.f  = 400
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 300
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'sw_crf_toa' )
    name.f = 'Shortwave Cloud Radiative Forcing @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = -100 ; int2d.f  = 20  ; max2d.f  = 100
    dmin2d.f = -50  ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -100 ; int1d.f  = 50  ; max1d.f  = 100
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'sw_up_sfc' )
    name.f = 'Upward Shortwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = 0   ; int2d.f  = 20  ; max2d.f  = 200
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'sw_down_toa' )
    name.f = 'Downward Shortwave Radiation @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = 0   ; int2d.f  = 50  ; max2d.f  = 500
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 250 ; max1d.f  = 500
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
*    color.f = 'grainbow'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'sw_down_sfc' )
    name.f = 'Downward Shortwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = 0   ; int2d.f  = 40  ; max2d.f  = 400
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 400
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
*    color.f = 'grainbow'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'sw_net_toa' )
    name.f = 'Down-Upward Shortwave Radiation @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = 0   ; int2d.f  = 40  ; max2d.f  = 400
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 300
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'lw_net_sfc' )
    name.f = 'Down-Upward Longwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = -200; int2d.f  = 20  ; max2d.f  = 0
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -100; int1d.f  = 50  ; max1d.f  = 0
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'sw_net_sfc' )
    name.f = 'Down-Upward Shortwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = 0   ; int2d.f  = 40  ; max2d.f  = 400
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 300
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'aw_net_toa' )
    name.f = 'Down-Upward Long+Shortwave Radiation @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = -200; int2d.f  = 40  ; max2d.f  = 200
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -200; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'aw_crf_toa' )
    name.f = 'Long+Shortwave Cloud Radiative Forcing @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = -100 ; int2d.f  = 20  ; max2d.f  = 100
    dmin2d.f = -50  ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -100 ; int1d.f  = 50  ; max1d.f  = 100
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'aw_net_sfc' )
    name.f = 'Down-Upward Long+Shortwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = -200; int2d.f  = 40  ; max2d.f  = 200
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -200; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( _varid.f = 'sh_sfc' | _varid.f = 'lh_sfc' )
    if( _varid.f = 'sh_sfc' ) ; name.f = 'Surface Sensible Heat Flux' ; endif
    if( _varid.f = 'lh_sfc' ) ; name.f = 'Surface Latent Heat Flux' ; endif
    unit.f = 'W/m^2'
    min2d.f  = -200 ; int2d.f  = 40  ; max2d.f  = 200
    dmin2d.f = -100 ; dint2d.f = 20  ; dmax2d.f = 100
    min1d.f  = -200 ; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
*    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    color.f = 'purple->bluered->maroon'
*    dcolor.f = 'bluered'
    dcolor.f = 'purple->bluered->maroon'
  endif

  if( _varid.f = 'energy_net_sfc' )
    name.f = 'Net Downward Surface Energy Flux'
    unit.f = 'W/m^2'
    min2d.f  = -200 ; int2d.f  = 40  ; max2d.f  = 200
    dmin2d.f = -100 ; dint2d.f = 20  ; dmax2d.f = 100
    min1d.f  = -200 ; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->bluered->maroon'
    dcolor.f = 'purple->bluered->maroon'
  endif

  if( _varid.f = 'land_wg_z1' | _varid.f = 'land_wg_z2' | _varid.f = 'land_wg_z3' | _varid.f = 'land_wg_z4' | _varid.f = 'land_wg_z5' )
    if( _varid.f = 'land_wg_z1' ) ; name.f = 'Soil Water @ z=1' ; endif
    if( _varid.f = 'land_wg_z2' ) ; name.f = 'Soil Water @ z=2' ; endif
    if( _varid.f = 'land_wg_z3' ) ; name.f = 'Soil Water @ z=3' ; endif
    if( _varid.f = 'land_wg_z4' ) ; name.f = 'Soil Water @ z=4' ; endif
    if( _varid.f = 'land_wg_z5' ) ; name.f = 'Soil Water @ z=5' ; endif
    unit.f = '0-1'
    min2d.f  = 0    ; int2d.f  = 0.1 ; max2d.f  = 1
    dmin2d.f = -0.5 ; dint2d.f = 0.1 ; dmax2d.f = 0.5
    min1d.f  = 0    ; int1d.f  = 0.5 ; max1d.f  = 1
    dmin1d.f = -0.5 ; dint1d.f = 0.1 ; dmax1d.f = 0.5
    color.f = 'grainbow'
    dcolor.f = 'purple->bluered->maroon'
  endif

  tmp = substr( _varid.f, 1, 5 )
  if( tmp = 'isccp' )
    if( _varid.f = 'isccp_ctp_all' | _varid.f = 'isccp_ctp_all_vis' )
      name.f = 'Cloud Top Pressure by ISCCP'
      tmp = substr( _varid.f, 7, 20 )
      sname.f = ', ' % tmp
      unit.f = '%'
      min2d.f  = 100 ; int2d.f  = 100 ; max2d.f  = 900
      dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
      min1d.f  = 100 ; int1d.f  = 200 ; max1d.f  = 900
      dmin1d.f = -50 ; dint1d.f = 25 ; dmax1d.f = 50
      color.f  = 'white-(0)->grainbow'
      dcolor.f = 'purple->blue->white->red->brown'
    else ; if( _varid.f = 'isccp_od_all' | _varid.f = 'isccp_od_all_vis' )
      name.f = 'log(Cloud Optical Depth) by ISCCP'
      tmp = substr( _varid.f, 7, 20 )
      sname.f = ', ' % tmp
      unit.f = '%'
      min2d.f  = -1 ; int2d.f  = 0.5 ; max2d.f  = 4
      dmin2d.f = -0.5 ; dint2d.f = 0.1  ; dmax2d.f = 0.5
      min1d.f  = -1 ; int1d.f  = 1 ; max1d.f  = 4
      dmin1d.f = -0.5 ; dint1d.f = 0.5 ; dmax1d.f = 0.5
      color.f  = 'white-(0)->grainbow'
      dcolor.f = 'purple->blue->white->red->brown'
    else
      name.f = 'ISCCP Cloud Fraction'
      tmp = substr( _varid.f, 7, 20 )
      sname.f = ', ' % tmp
      unit.f = '%'
      min2d.f  = 10  ; int2d.f  = 10 ; max2d.f  = 90
      dmin2d.f = -50 ; dint2d.f = 10 ; dmax2d.f = 50
*      dmin2d.f = -10 ; dint2d.f = 2 ; dmax2d.f = 10
      min1d.f  = 0   ; int1d.f  = 25 ; max1d.f  = 100
      dmin1d.f = -20 ; dint1d.f = 10 ; dmax1d.f = 20
*      dmin1d.f = -10 ; dint1d.f = 5 ; dmax1d.f = 10
      color.f  = 'white-(0)->grainbow'
      dcolor.f = 'purple->blue->white->red->brown'
*      dcolor.f = 'white->white->gray'
    endif ; endif
  endif





  f = f + 1
endwhile


***************************************************************
* Variable List (to be deleted)
***************************************************************
*sname = ''
** variable
*if( _varid = 'iwp' )
*  name = 'Ice Water Path'
*  unit = 'g/m^2'
*  min2d  = 0 ; int2d  = 40   ; max2d  = 400
*  dmin2d = -200; dint2d = 40  ; dmax2d = 200
*  min1d  = 0   ; int1d  = 100 ; max1d  = 200
*  dmin1d = -40 ; dint1d = 20  ; dmax1d = 40
*  color = 'grainbow'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'lwp' )
*  name = 'Liquid Water Path'
*  unit = 'g/m^2'
*  min2d  = 0 ; int2d  = 40   ; max2d  = 400
*  dmin2d = -200; dint2d = 40  ; dmax2d = 200
*  min1d  = 0   ; int1d  = 100 ; max1d  = 200
*  dmin1d = -40 ; dint1d = 20  ; dmax1d = 40
*  color = 'grainbow'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'pt_700_minus_925' )
*  name = '`3z`0`b700`n-`3z`0`b925`n'
*  unit = 'K'
*  min2d  = 10 ; int2d  = 2 ; max2d  = 30
*  dmin2d = -5 ; dint2d = 1 ; dmax2d = 5
*  min1d  = 10 ; int1d  = 5 ; max1d  = 30
*  dmin1d = -5 ; dint1d = 2.5 ; dmax1d = 5
*  color = 'grainbow'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'pt_z3000s_minus_z500s' )
*  name = '`3z`0`b700`n-`3z`0`b925`n'
*  unit = 'K'
*  min2d  = 10 ; int2d  = 2 ; max2d  = 30
*  dmin2d = -5 ; dint2d = 1 ; dmax2d = 5
*  min1d  = 10 ; int1d  = 5 ; max1d  = 30
*  dmin1d = -5 ; dint1d = 2.5 ; dmax1d = 5
*  color = 'grainbow'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'precip' )
*  name = 'Precipitation'
*  unit = 'mm/day'
*  min2d  = 1   ; int2d  = 1 ; max2d  = 20
*  dmin2d = -10 ; dint2d = 1 ; dmax2d = 10
*  min1d  = 0   ; int1d  = 3 ; max1d  = 15
*  dmin1d = -6  ; dint1d = 2 ; dmax1d = 6
**  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  color = 'white-(0)->grainbow'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'qv2m' )
*  name = '2m Specif Humidity'
*  unit = 'g/kg'
*  min2d  = 2 ; int2d  = 2 ; max2d  = 20
*  dmin2d = -2 ; dint2d = 0.4  ; dmax2d = 2
*  min1d  = 0 ; int1d  = 5 ; max1d  = 20
*  dmin1d = -2  ; dint1d = 1  ; dmax1d = 2
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 't2m' )
*  name = '2m Temperature'
*  unit = 'K'
*  min2d  = 200 ; int2d  = 10 ; max2d  = 320
*  dmin2d = -10 ; dint2d = 1  ; dmax2d = 10
*  min1d  = 220 ; int1d  = 30 ; max1d  = 310
*  dmin1d = -6  ; dint1d = 3  ; dmax1d = 6
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'lw_up_toa' | _varid = 'lw_up_clr_toa' )
*  name = 'Upward Longwave Radiation @ TOA'
*  if( _varid = 'lw_up_clr_toa' ) ; name = name % ' (Clear Sky)' ; endif
*  unit = 'W/m^2'
*  min2d  = 100 ; int2d  = 20  ; max2d  = 340
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 100 ; int1d  = 50  ; max1d  = 300
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'lw_crf_toa' )
*  name = 'Longwave Cloud Radiative Forcing @ TOA'
*  unit = 'W/m^2'
*  min2d  = -100 ; int2d  = 20  ; max2d  = 100
*  dmin2d = -50  ; dint2d = 10  ; dmax2d = 50
*  min1d  = -100 ; int1d  = 50  ; max1d  = 100
*  dmin1d = -50  ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'lw_up_sfc' )
*  name = 'Upward Longwave Radiation @ Surface'
*  unit = 'W/m^2'
*  min2d  = 100 ; int2d  = 30  ; max2d  = 480
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 100 ; int1d  = 200 ; max1d  = 500
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'lw_down_sfc' )
*  name = 'Downward Longwave Radiation @ Surface'
*  unit = 'W/m^2'
*  min2d  = 100 ; int2d  = 30  ; max2d  = 480
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 100 ; int1d  = 200 ; max1d  = 500
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'sw_up_toa' | _varid = 'sw_up_clr_toa' )
*  name = 'Upward Shortwave Radiation @ TOA'
*  if( _varid = 'sw_up_clr_toa' ) ; name = name % ' (Clear Sky)' ; endif
*  unit = 'W/m^2'
*  min2d  = 0   ; int2d  = 40  ; max2d  = 400
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 0   ; int1d  = 100 ; max1d  = 300
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'sw_crf_toa' )
*  name = 'Shortwave Cloud Radiative Forcing @ TOA'
*  unit = 'W/m^2'
*  min2d  = -100 ; int2d  = 20  ; max2d  = 100
*  dmin2d = -50  ; dint2d = 10  ; dmax2d = 50
*  min1d  = -100 ; int1d  = 50  ; max1d  = 100
*  dmin1d = -50  ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'sw_up_sfc' )
*  name = 'Upward Shortwave Radiation @ Surface'
*  unit = 'W/m^2'
*  min2d  = 0   ; int2d  = 20  ; max2d  = 200
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 0   ; int1d  = 100 ; max1d  = 200
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'sw_down_toa' )
*  name = 'Downward Shortwave Radiation @ TOA'
*  unit = 'W/m^2'
*  min2d  = 0   ; int2d  = 50  ; max2d  = 500
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 0   ; int1d  = 250 ; max1d  = 500
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
**  color = 'grainbow'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'sw_down_sfc' )
*  name = 'Downward Shortwave Radiation @ Surface'
*  unit = 'W/m^2'
*  min2d  = 0   ; int2d  = 40  ; max2d  = 400
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 0   ; int1d  = 100 ; max1d  = 400
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
**  color = 'grainbow'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'sw_net_toa' )
*  name = 'Down-Upward Shortwave Radiation @ TOA'
*  unit = 'W/m^2'
*  min2d  = 0   ; int2d  = 40  ; max2d  = 400
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 0   ; int1d  = 100 ; max1d  = 300
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'lw_net_sfc' )
*  name = 'Down-Upward Longwave Radiation @ Surface'
*  unit = 'W/m^2'
*  min2d  = -200; int2d  = 20  ; max2d  = 0
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = -100; int1d  = 50  ; max1d  = 0
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'sw_net_sfc' )
*  name = 'Down-Upward Shortwave Radiation @ Surface'
*  unit = 'W/m^2'
*  min2d  = 0   ; int2d  = 40  ; max2d  = 400
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 0   ; int1d  = 100 ; max1d  = 300
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'aw_net_toa' )
*  name = 'Down-Upward Long+Shortwave Radiation @ TOA'
*  unit = 'W/m^2'
*  min2d  = -200; int2d  = 40  ; max2d  = 200
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = -200; int1d  = 100 ; max1d  = 200
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'aw_crf_toa' )
*  name = 'Long+Shortwave Cloud Radiative Forcing @ TOA'
*  unit = 'W/m^2'
*  min2d  = -100 ; int2d  = 20  ; max2d  = 100
*  dmin2d = -50  ; dint2d = 10  ; dmax2d = 50
*  min1d  = -100 ; int1d  = 50  ; max1d  = 100
*  dmin1d = -50  ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'aw_net_sfc' )
*  name = 'Down-Upward Long+Shortwave Radiation @ Surface'
*  unit = 'W/m^2'
*  min2d  = -200; int2d  = 40  ; max2d  = 200
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = -200; int1d  = 100 ; max1d  = 200
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( _varid = 'sh_sfc' | _varid = 'lh_sfc' )
*  if( _varid = 'sh_sfc' ) ; name = 'Surface Sensible Heat Flux' ; endif
*  if( _varid = 'lh_sfc' ) ; name = 'Surface Latent Heat Flux' ; endif
*  unit = 'W/m^2'
*  min2d  = -200 ; int2d  = 40  ; max2d  = 200
*  dmin2d = -100 ; dint2d = 20  ; dmax2d = 100
*  min1d  = -200 ; int1d  = 100 ; max1d  = 200
*  dmin1d = -50  ; dint1d = 25  ; dmax1d = 50
**  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  color = 'purple->bluered->maroon'
**  dcolor = 'bluered'
*  dcolor = 'purple->bluered->maroon'
*endif
*
*if( _varid = 'energy_net_sfc' )
*  name = 'Net Downward Surface Energy Flux'
*  unit = 'W/m^2'
*  min2d  = -200 ; int2d  = 40  ; max2d  = 200
*  dmin2d = -100 ; dint2d = 20  ; dmax2d = 100
*  min1d  = -200 ; int1d  = 100 ; max1d  = 200
*  dmin1d = -50  ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->bluered->maroon'
*  dcolor = 'purple->bluered->maroon'
*endif
*
*if( _varid = 'land_wg_z1' | _varid = 'land_wg_z2' | _varid = 'land_wg_z3' | _varid = 'land_wg_z4' | _varid = 'land_wg_z5' )
*  if( _varid = 'land_wg_z1' ) ; name = 'Soil Water @ z=1' ; endif
*  if( _varid = 'land_wg_z2' ) ; name = 'Soil Water @ z=2' ; endif
*  if( _varid = 'land_wg_z3' ) ; name = 'Soil Water @ z=3' ; endif
*  if( _varid = 'land_wg_z4' ) ; name = 'Soil Water @ z=4' ; endif
*  if( _varid = 'land_wg_z5' ) ; name = 'Soil Water @ z=5' ; endif
*  unit = '0-1'
*  min2d  = 0    ; int2d  = 0.1 ; max2d  = 1
*  dmin2d = -0.5 ; dint2d = 0.1 ; dmax2d = 0.5
*  min1d  = 0    ; int1d  = 0.5 ; max1d  = 1
*  dmin1d = -0.5 ; dint1d = 0.1 ; dmax1d = 0.5
*  color = 'grainbow'
*  dcolor = 'purple->bluered->maroon'
*endif
*
*if( _varid = 'isccp_high_vis' )
*  name = 'ISCCP Visible Cloud Fraction'
*  if( _varid = 'isccp_high_vis' ) ; sname = 'High' ; endif
*  unit = '%'
*  min2d  = 10  ; int2d  = 10 ; max2d  = 90
*  dmin2d = -50 ; dint2d = 10 ; dmax2d = 50
*  min1d  = 0   ; int1d  = 25 ; max1d  = 100
*  dmin1d = -20 ; dint1d = 10 ; dmax1d = 20
*  color = 'white-(0)->grainbow'
*  dcolor = 'purple->blue->white->red->brown'
*endif


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
*    'color -kind 'color' 'min2d' 'max2d' 'int2d
    'color -kind 'color.f1' 'min2d.f1' 'max2d.f1' 'int2d.f1
    'v = v'f1
  else
*    'color -kind 'dcolor' 'dmin2d' 'dmax2d' 'dint2d
    'color -kind 'dcolor.f1' 'dmin2d.f1' 'dmax2d.f1' 'dint2d.f1
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
*      'set cint 'int2d
      'set cint 'int2d.f1
    else
*      'set cint 'dint2d
      'set cint 'dint2d.f1
    endif
    'd v'
  endif

  'setfont small'
  if( f2 = '' ) ; 'draws ('_run.f1')' % sname.f1
  else ; 'draws ('_run.f1') - ('_run.f2')' % sname.f1 ; endif

*  if( d = 1 )
*    'setfont normal'
*    'draws -yoffset 0.25 -pos tl -base bl 'name' for 'term' ['unit']'
    'setfont normal -base tl'
*    'draw string 1.4 8.4 'name' for 'term' '_year' ['unit']'
    'draw string 1.4 8.4 'name.f1' for 'term' '_year' ['unit.f1']'
*  endif

*** zonal mean ***

  ypos = 2.5 * j - 1.6
  if( i = 1 ) ; 'set parea 4.8 5.8 'ypos' 'ypos+2.0 ; endif
  if( i = 2 ) ; 'set parea 9.8 10.8 'ypos' 'ypos+2.0 ; endif

  'set xyrev on'
*  if( f2 = '' ) ; 'set vrange 'min1d' 'max1d ; 'set xlint 'int1d
  if( f2 = '' ) ; 'set vrange 'min1d.f1' 'max1d.f1 ; 'set xlint 'int1d.f1
*  else ; 'set vrange 'dmin1d' 'dmax1d ; 'set xlint 'dint1d ; endif
  else ; 'set vrange 'dmin1d.f1' 'dmax1d.f1 ; 'set xlint 'dint1d.f1 ; endif
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
*    'color 'dmin' 'dmax' 'dint' -kind 'dcolor
*    'd d'
*
*    xpos = 3.5 * i - 2.7
*    ypos = 4.0 * j - 3.5
*    'xcbar 'xpos' 'xpos+3.0' 'ypos' 'ypos+0.15' -line on -fstep 2 -foffset 1 -fwidth 0.08 -fheight 0.08'
*    'set gxout contour'; 'set cint 'dint;  'set cthick 6'; 'set ccolor 1'
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
