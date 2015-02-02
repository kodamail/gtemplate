function latlev( args )
'reinit'

'!pwd > pwd.tmp'
ret = read( 'pwd.tmp' )
pwd = sublin( ret, 2 )
'!rm -f pwd.tmp'
gs=pwd'/lat_lev.gs'
rc = gsfallow("on")

'set line 0'
'draw rec 0 0 11 8.5'

*cnf = subwrd( args, 1 )

sw = subwrd( args, 1 )
***************************************************************
***************************************************************
***************************************************************
*
* set here
*
if( sw != 'cnf' )
*if( cnf != 'cnf' )
  cnf = sw

* set default values
  _varid      = ''
  _cbar       = 'hor'
  _cbar.1     = '1'
  _cbar.2     = ''
  _cont       = 'off'
  _shade      = 'on'
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
  _fmax       = 0
  _save       = ''
  i = 1
  while( i <= 6 )
    _disp.i  = ''
    _cont.i  = ''
    _shade.i = ''
    _over.i  = ''
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
  ret = read( 'inc_latlev.gsf' )
  stat = sublin( ret, 1 )
  if( stat = 0 )
    say 'error: temporal file inc_latlev.gsf exists. Please remove.'
    say '(illegal multiple execution may occur)'
    exit
  endif

* load cnf
  ret = write( 'inc_latlev.gsf', 'function inc_latlev()' )
  ret = write( 'inc_latlev.gsf', 'ret = 'cnf'()' )
  ret = write( 'inc_latlev.gsf', 'return ret' )
  ret = close( 'inc_latlev.gsf' )
  ret = inc_latlev()
  '!rm inc_latlev.gsf'

* set default and/or necessary values necessary after loading cnf
  i = 1
  while( i <= 6 )
    if( _cont.i  = '' ) ; _cont.i  = _cont  ; endif
    if( _shade.i = '' ) ; _shade.i = _shade ; endif
    i = i + 1
  endwhile

  f = 1
  while( f <= _fmax )
    if( (   _name != '' &   _name !=   '_name' ) & (   _name.f = '' |   _name.f =   '_name.'f ) ) ;   _name.f =   _name ; endif
    if( (   _unit != '' &   _unit !=   '_unit' ) & (   _unit.f = '' |   _unit.f =   '_unit.'f ) ) ;   _unit.f =   _unit ; endif
    if( (    _min != '' &    _min !=    '_min' ) & (    _min.f = '' |    _min.f =    '_min.'f ) ) ;    _min.f =    _min ; endif
    if( (    _int != '' &    _int !=    '_int' ) & (    _int.f = '' |    _int.f =    '_int.'f ) ) ;    _int.f =    _int ; endif
    if( (    _max != '' &    _max !=    '_max' ) & (    _max.f = '' |    _max.f =    '_max.'f ) ) ;    _max.f =    _max ; endif
    if( (   _dmin != '' &   _dmin !=   '_dmin' ) & (   _dmin.f = '' |   _dmin.f =   '_dmin.'f ) ) ;   _dmin.f =   _dmin ; endif
    if( (   _dint != '' &   _dint !=   '_dint' ) & (   _dint.f = '' |   _dint.f =   '_dint.'f ) ) ;   _dint.f =   _dint ; endif
    if( (   _dmax != '' &   _dmax !=   '_dmax' ) & (   _dmax.f = '' |   _dmax.f =   '_dmax.'f ) ) ;   _dmax.f =   _dmax ; endif
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
********** arguements from external file **********
else

*  cmd_fin = 'quit'
  cmd_fin = ''

  _cbar = 'hor'
  _cbar.1 = '2'
  _cbar.2 = '5'

  _cont.1 = 'on'
  _cont.2 = 'on'
  _cont.3 = 'on'
  _cont.4 = 'on'
  _cont.5 = 'on'
  _cont.6 = 'on'

  _vert = 'pressure'
  _levmin = 1000
  _levmax = 10
  _latmin = -90 ; _latmax = 90

  cnf_fname = subwrd( args, 2 )

***** var-name
  _varid = sublin( read( cnf_fname ), 2 )
*  var = varid
  say 'varid = ' % _varid

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
*     e.g. time_start=01jun2004, time_endpp=01sep2004 (if JJA)
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _time_start  = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _time_endpp  = tmp.p
      say 'time_start = ' % _time_start
      say 'time_endpp = ' % _time_endpp
      p = p + 1 ; continue
    endif

*    if( tmp.p = '-time.1' )
    if( tmph = '-time' )
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _time_start.tmpt  = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      _time_endpp.tmpt  = tmp.p
      say 'time_start.' % tmpt % ' = ' % _time_start.tmpt
      say 'time_endpp.' % tmpt % ' = ' % _time_endpp.tmpt
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


*  tmp = sublin( read( cnf_fname ), 2 )
*  tmp1 = subwrd( tmp, 1 )
*  tmp2 = subwrd( tmp, 2 )
*  tmp3 = subwrd( tmp, 3 )
*  tmp4 = subwrd( tmp, 4 )
*  if( tmp1 = '-ym' )
**   e.g. year=2004, month=6
*    _year  = tmp2
*    _month = tmp3
*    say 'year  = ' % _year
*    say 'month = ' %_month
*  endif
*  if( tmp1 = '-time' )
**  else
**   e.g. time_start=01jun2004, time_endpp=01sep2004 (if JJA)
*    _time_start  = tmp2
*    _time_endpp  = tmp3
*    say 'time_start = ' % _time_start
*    say 'time_endpp = ' % _time_endpp
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
    disp.d = sublin( read( cnf_fname ), 2 )
    say 'disp #' % d % ': ' % disp.d
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
    exit
  endif
  _f2df.f = last()
  f = f + 1
endwhile

endif
***************************************************************
***************************************************************
***************************************************************

'q gxinfo'
line = sublin( result, 3 )
xmin = subwrd( line, 4 )
xmax = subwrd( line, 6 )
xw = xmax - xmin
line = sublin( result, 4 )
ymin = subwrd( line, 4 )
ymax = subwrd( line, 6 )
yw = ymax - ymin
latw = ( _latmax - _latmin ) * 111
levw = ( 16 * math_log10(_levmin/_levmax) )
ratio = (yw / levw) / (xw / latw)
my = 1
mz = ratio


***************************************************************
* Automatic Time Setting
***************************************************************
if( _year = 'clim' ) ; _year = '%y' ; endif

term = ''
if( _time_start = '_time_start' | _time_start = '' )
  if( _month >= 1 & _month <= 12 )
    cm   = cmonth( _month, 3 )
    cmpp = cmonth( _month+1, 3 )
    yearpp = _year
    if( _month = 12 )
      if( _year = '%y' ) ; yearpp = '%ypp'
      else               ; yearpp = yearpp + 1 ; endif
    endif
    term = cmonth( _month )
    _time_start = '01'cm''_year
    _time_endpp = '01'cmpp''yearpp
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
    if( _year = '%y' ) ; yearpp = '%ypp'
    else               ; yearpp = _year + 1 ; endif
    _time_start = '01dec'_year
    _time_endpp = '01mar'yearpp
  endif
  if( _month = 999 )
    term = 'ANU'
    if( _year = '%y' ) ; yearpp = '%ypp'
    else               ; yearpp = _year + 1 ; endif
    _time_start = '01jan'_year
    _time_endpp = '01jan'yearpp
  endif
else
  term = _time_start' <= time < '_time_endpp
  _year = ''
endif

*_time_endpp = 

** time_start, time_end -> time_start.f, time_end.f
*f = 1
*flag = 0
*while( f <= _fmax )
*  'set dfile 'f
*  if( _time_start.f = '_time_start.'f | _time_start.f = '' )
*    _time_start.f = t2time( time2t( _time_start ) )
*    _time_end.f   = t2time( time2t( _time_endpp ) - 1 )
*  else
*    if( flag = 0 )
*      term = term % ' (Exception exists)'
*      flag = 1
*    endif
*  endif
*  say _run.f % ': ' % _time_start.f % ' - ' % _time_end.f
*  f = f + 1
*endwhile

* time_start, time_end -> time_start.f, time_end.f
f = 1
flag = 0
while( f <= _fmax )
  'set dfile '_f2df.f

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

    tmp = strrep( _time_endpp, '%ypp', _year_end.f+1 )
    tmp = strrep(         tmp, '%y'  , _year_end.f )
    tmp = t2time( time2t( tmp ) - 1 )
    tmp = strrep(         tmp, _year_end.f+1, '%ypp' )
    _time_end.f = strrep( tmp, _year_end.f, '%y' )

    tmp = strrep( _time_start, '%ypp', _year_end.f+1 )
    tmp = strrep(         tmp, '%y'  , _year_end.f )
    tmp = t2time( time2t( tmp ) )
    tmp = strrep(         tmp, _year_end.f+1, '%ypp' )
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
  say 'Processing #'f
*  'set dfile 'f
  'set dfile '_f2df.f
  'set lev '_levmin' '_levmax
  'set lat '_latmin' '_latmax
  'set lon 0'
  'set t 1'
*  'clave '_var.1' 'jrac' a'

  xdef = qctlinfo( f, 'xdef', 1 )
  ydef = qctlinfo( f, 'ydef', 1 )
  zdef = qctlinfo( f, 'zdef', 1 )

  say 'xdef='xdef
  if( xdef > 1 )
    _var.f = 'ave(' % _var.f % ',x=1,x=' % xdef % ')'
  endif

  'set x 1'
  'set y 1 'ydef
  'set z 1 'zdef
  if( _time_start.f != '' & _time_end.f != '' )
    prex( 'v'f' = ave( '_var.f', time='_time_start.f', time='_time_end.f' )' )

    if( _varid = 'mim_divf' )
      prex( 'epy'f' = ave( epy.'f', time='_time_start.f', time='_time_end.f' )' )
      prex( 'epz'f' = ave( epz.'f', time='_time_start.f', time='_time_end.f' )' )
    endif
  endif

  if( _clim_arg.f != '' )
    prex( 'clave '_var.f' '_clim_arg.f' v'f )
    if( _varid = 'mim_divf' )
      prex( 'clave epy '_clim_arg.f' epy.'f )
      prex( 'clave epz '_clim_arg.f' epz.'f )
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
   
      if( _varid = 'mim_divf' )
        'color 'color
        'd v'f1

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
        'vy = epy'f1'*'my
        'vz = epz'f1'*'mz
*        'vm = sqrt(epy'f1'*epy'f1'+epz'f1'*epz'f1')'
        'vm = sqrt(vy*vy+vz*vz)'

        base = 3e+8
        'set arrscl 0.5 'base ; 'set cthick 1'; 'set ccolor 14'
        'd skip( maskout( maskout( vy, (vm-3e+7) ),-(lev-1000)*(lev-0)), 'sy.f1', 'sz.f1'); vz'

        base = 3e+7
        'set arrscl 0.5 'base ; 'set cthick 6'; 'set ccolor 1'
        'd skip( maskout( maskout( vy, -(vm-3e+6)*(vm-3e+7) ),-(lev-1000)*(lev-0)), 'sy.f1', 'sz.f1'); vz'

        base = 3e+6
        'set arrscl 0.51 'base ; 'set cthick 1'; 'set ccolor 1'
        'd skip( maskout( maskout( vy, -(vm-3e+6) ),-(lev-1000)*(lev-0)), 'sy.f1', 'sz.f1'); vz'

      else
        'color -kind '_color.f1' '_min.f1' '_max.f1' '_int.f1
        'd v'f1
      endif

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
      'xcbar 'xpos' 'xpos+3.0' 'ypos' 'ypos+0.15' -line on -fstep 2 -foffset 1 -fwidth 0.08 -fheight 0.08'
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

    if( _shade.d = 'on' )
      diff( 'v'f2, f2, 'v'f1, f1, 'd' )
      'color '_dmin.f1' '_dmax.f1' '_dint.f1' -kind '_dcolor.f1
      'd d'

      xpos = 3.5 * i - 2.7
      ypos = 4.0 * j - 3.5
      'xcbar 'xpos' 'xpos+3.0' 'ypos' 'ypos+0.15' -line on -fstep 2 -foffset 1 -fwidth 0.08 -fheight 0.08'
    endif

    if( _cont.d = 'on' )
      'set gxout contour'; 'set cint '_dint.f1;  'set cthick 6'; 'set ccolor 1'
      'd d'
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
  'save '_save
endif
cmd_fin

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
  d' = const( 'v1', 0, -a )'
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
    color = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
    if( varcnfid = '2' )
      dmin = -10 ; dint = 2 ; dmax = 10
    endif
  endif

  if( varid = 'v' )
    name = 'Meridional Wind'
    unit = 'm/s'
    min  = -5  ; int = 1   ; max = 5
    dmin = -1 ; dint = 0.2 ; dmax = 1
    color = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'w' )
    name = 'Vertical Velocity'
    unit = 'mm/s'
    min  = -10  ; int = 1 ; max = 10
    dmin = -5 ; dint = 0.5 ; dmax = 5
    color = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 't' )
    name = 'Temperature'
    unit = 'K'
    min  = 190 ; int  = 10 ; max  = 290
    dmin = -10 ; dint = 1  ; dmax = 10
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'purple->bluered->maroon'
*    dcolor = 'bluered'
  endif

  if( varid = 'qv' )
    name = 'Specific Humidity'
    unit = 'g/kg'
    min  = 2  ; int  = 2   ; max  = 20
    dmin = -2 ; dint = 0.4 ; dmax = 2
    color = 'white-(0)->grainbow'
    dcolor = 'blue->aqua->white->red->maroon'
*    color = 'white->aqua->blue->purple'
*    dcolor = 'maroon->red->white->aqua->blue'
  endif

  if( varid = 'rh' )
    name = 'Relative Humidity'
    unit = '%'
    min  = 10  ; int  = 10 ; max  = 100
    dmin = -20 ; dint = 4  ; dmax = 20
    color  = 'white-(0)->grainbow'
    dcolor = 'blue->aqua->white->red->maroon'
*    color  = 'white->aqua->blue->purple'
*    dcolor = 'maroon->red->white->aqua->blue'
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
    color = 'white-(0)->grainbow'
    dcolor = 'maroon->red->white->aqua->blue'
*  color = 'white->aqua->blue->purple'
  endif

  if( varid = 'temp' )
    name = 'Terminal Velocity'
    unit = 'm/s'
    min  = 0.05 ; int  = 0.05 ; max  = 0.5
    dmin = -10  ; dint = 2    ; dmax = 10
    color  = 'white->aqua->blue->purple'
    dcolor = 'maroon->red->white->aqua->blue'
  endif

  if( varid = 'n2' )
    name = 'Static Stability N`a2`n'
    unit = '10`a-4`n /s`a2`n'
    min  = 1    ; int  = 5   ; max  = 0.5
    dmin = -0.5 ; dint = 0.1 ; dmax = 0.5
    color  = 'white->aqua->blue->purple'
    dcolor = 'maroon->red->white->aqua->blue'
  endif

  if( varid = 'mim_u' )
    name = 'MIM Zonal Wind'
    unit = 'm/s'
    min  = -50 ; int  = 10 ; max  = 50
    dmin = -10 ; dint = 2  ; dmax = 10
    color  = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor = 'bluered'
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
*    color = 'purple->blue->aqua->lime->yellow->red->maroon'
    color  = 'purple->bluered->maroon'
    dcolor = 'bluered'
  endif

  if( varid = 'mim_divf' )
    name = 'MIM EP Flux / Divergence'
    unit = 'm/(s day)'
    color = '-levs -20 -10 -4 -2 -1 0 1 2 4 10 20 -kind bluered'
*    color = 'purple->blue->aqua->lime->yellow->red->maroon'
*    color = 'purple->bluered->maroon'
*    dcolor = 'bluered'
endif


* set default varcnf to global varcnf 
  if(   _name.f =   '_name.'f ) ;   _name.f =   name ; endif
  if(   _unit.f =   '_unit.'f ) ;   _unit.f =   unit ; endif
  if(    _min.f =    '_min.'f ) ;    _min.f =    min ; endif
  if(    _int.f =    '_int.'f ) ;    _int.f =    int ; endif
  if(    _max.f =    '_max.'f ) ;    _max.f =    max ; endif
  if(   _dmin.f =   '_dmin.'f ) ;   _dmin.f =   dmin ; endif
  if(   _dint.f =   '_dint.'f ) ;   _dint.f =   dint ; endif
  if(   _dmax.f =   '_dmax.'f ) ;   _dmax.f =   dmax ; endif
  if(  _color.f =  '_color.'f ) ;  _color.f =  color ; endif
  if( _dcolor.f = '_dcolor.'f ) ; _dcolor.f = dcolor ; endif
return
