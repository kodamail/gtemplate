*
* prepare cnf_spm.gsf in the same directory, cnf/ or cnf_sample/.
*
function spm( args )
  'reinit'
  rc = gsfallow( 'on' )

*----- set frame (depends on frame size ... TODO)
  'set line 0'
  'draw rec 0 0 11 8.5'

*----- set cnf by loading cnf_spm.gsf
  set_cnf()
  set_region()
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
*    say 'Processing #'f
    'set dfile '_f2df.f
    xdef = qctlinfo( f, 'xdef', 1 )
    ydef = qctlinfo( f, 'ydef', 1 )
    zdef = qctlinfo( f, 'zdef', 1 )
    tdef = qctlinfo( f, 'tdef', 1 )

    if( _lsmask = 'lnd' | _lsmask = 'ocn' )
*    if( xdef > 360 )
*      prex( 'xopen /ceist/nicam/hpci/amip/N12/197806/gl09/control/run01/output/invariant/lsmask/02560x01280.zorg.torg/lsmask.ctl' )
*    else
*      prex( 'xopen /ceist/nicam/hpci/amip/N12/197806/gl09/control/run01/output/invariant/lsmask/00288x00145.zorg.torg/lsmask.ctl' )
*    endif
      prex( 'xopen '_lsmask_ctl )
      'set x 1 'xdef
      'set y 1 'ydef
      'set z 1'
      'set t 1'
      fn = last();

      if( _lsmask = 'lnd' )
        prex( 'mask = lterp(  lsmask.'fn'(z=1,t=1)-0.5, '_var.f' )' )
      endif
      if( _lsmask = 'ocn' )
        prex( 'mask = lterp( -lsmask.'fn'(z=1,t=1)+0.5, '_var.f' )' )
      endif

      'set x 1'
      'set y 1'
      'set z 1'
      'set time '_time_start.f' '_time_end.f
      prex( 'v'f' = aave( maskout('_var.f',mask), lon='_lonmin', lon='_lonmax', lat='_latmin', lat='_latmax' )' )

      'close 'fn
    endif

    if( _lsmask = 'all'  )
      'set x 1'
      'set y 1'
      'set z 1'
      'set time '_time_start.f' '_time_end.f
      prex( 'v'f' = aave( '_var.f', lon='_lonmin', lon='_lonmax', lat='_latmin', lat='_latmax' )' )
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
    'set y 1'
    'set z 1'
*    'set time '_time_start.f' '_time_end.f
    'set time '_time_start.1' '_time_end.1

    'set vrange '_min.f' '_max.f
    'set ylint '_int.f
    'set xlopts 1 6 0.18'
    'set ylopts 1 6 0.18'
    'set cmark 0'
    'set cthick '_cthick.f ; 'set ccolor '_ccolor.f ; 'set cstyle '_cstyle.f
    'd v'f

    yoffset = -0.3 * f
    'setfont normal'
    if( name = '' | unit = '' )
      'draws -pos tl -base l -xoffset 0.7 -yoffset 'yoffset' -color '_ccolor.f' '_name.f' ['_unit.f'], '_run.f
    else
      'draws -pos tl -base l -xoffset 0.7 -yoffset 'yoffset' -color '_ccolor.f' '_run.f
    endif
    ypos = 7.8 - (f-1) * 0.3
    'set line '_ccolor.f' '_cstyle.f' '_cthick.f
    'draw line 1.1 'ypos' 1.6 'ypos

    f = f + 1
  endwhile

  'setfont normal'
  if( _lsmask = 'all' )
    'draws 'name', '_region' ['unit']'
  else
    'draws 'name', '_region'-'_lsmask' ['unit']'
  endif
* TODO: _sname.f

****************************
  if( _diff = -1 ) ; exit ; endif
*'mul 1 2 1 1 -yoffset 0.3'
  'mul 1 2 1 1'
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
    'd lterp(v'f',v'_diff') - v'_diff

    if( f != _diff )
      yoffset = -0.3 * f
      'setfont normal'

      if( name = '' | unit = '' )
        'draws -pos tl -base l -xoffset 0.7 -yoffset 'yoffset' -color '_ccolor.f' '_name.f' ['_unit.f'], '_run.f
      else
        'draws -pos tl -base l -xoffset 0.7 -yoffset 'yoffset' -color '_ccolor.f' '_run.f
      endif

*    ypos = 4.1 - (f-1) * 0.3
      ypos = 3.8 - (f-1) * 0.3
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

***************************************************************
exit
***************************************************************


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

  if( varid = 't2m' )
    name = '2m Temperature'
    unit = 'K'
    min  = 270 ; int  = 5 ; max  = 300
    dmin = -5  ; dint = 1  ; dmax = 5
    if( _region = 'nh' | _region = 'sh' )
      min  = 260 ; int  = 5 ; max  = 300
      dmin = -5  ; dint = 1  ; dmax = 5
    endif
    if( _region = 'nhmid' | _region = 'shmid' )
      min  = 260 ; int  = 5 ; max  = 300
      dmin = -8  ; dint = 2  ; dmax = 8
    endif
    if( _region = 'nhhigh' | _region = 'shhigh' )
      min  = 220 ; int  = 10 ; max  = 290
      dmin = -15 ; dint = 3 ; dmax = 15
    endif
  endif
  if( substr(varid,1,7) = 'land_wg' )
    if( varid = 'land_wg1' ) ; name = 'Soil Water @ z=1' ; endif
    if( varid = 'land_wg2' ) ; name = 'Soil Water @ z=2' ; endif
    if( varid = 'land_wg3' ) ; name = 'Soil Water @ z=3' ; endif
    if( varid = 'land_wg4' ) ; name = 'Soil Water @ z=4' ; endif
    if( varid = 'land_wg5' ) ; name = 'Soil Water @ z=5' ; endif
    unit = '0-1'
    min  = 0 ; int  = 0.1 ; max  = 0.5
    dmin = -0.1  ; dint = 0.05  ; dmax = 0.1
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

return

function set_cnf()

* set default values
  _varid      = ''
  _diff       = 1
  _latmin     = -90
  _latmax     = 90
  _lonmin     = 0
  _lonmax     = 360
  _region     = 'global'
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

  _lsmask     = 'all'
  _lsmask_ctl = 'lsmask.ctl'

*----- load cnf_spm.gsf
  rc = gsfpath( 'cnf cnf_sample' )
  ret = cnf_spm()

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
