function lat_lon_with_zm( args )
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
  ret = write( 'inc_latlon_zm.gsf', 'function inc_latlon_zm()' )
  ret = write( 'inc_latlon_zm.gsf', 'ret = latlon_zm()' )
  ret = write( 'inc_latlon_zm.gsf', 'return ret' )
  ret = close( 'inc_latlon_zm.gsf' )

  ret = inc_latlon_zm()

*  '!echo $$ > '

  say _a
exit

*  'run sample_lat_lon_with_zm.gs'
  ret = test()

*cmd = 'say ok'
*cmd
say _a
say ok
exit

  cmd_fin = ''
***************************************************************
* Variable
***************************************************************
*varid = 't2m'
*varid = 'qv2m'
varid = 'precip'
*varid = 'mslp'
*varid = 'sst'

*varid = 'pt_700_minus_925'
***varid = 'pt_z3000s_minus_z500s'
*varid = 'iwp'
*varid = 'lwp'

*varid = 'lw_up_toa'
*varid = 'lw_up_clr_toa'
*varid = 'sw_up_toa'
*varid = 'sw_up_clr_toa'
*varid = 'sw_down_toa'
*varid = 'sw_net_toa'
*varid = 'aw_net_toa'
*varid = 'lw_crf_toa'
*varid = 'sw_crf_toa'
*varid = 'aw_crf_toa'

*varid = 'lw_up_sfc'
*varid = 'lw_down_sfc'
*varid = 'lw_net_sfc'
*varid = 'sw_up_sfc'
*varid = 'sw_down_sfc'
*varid = 'sw_net_sfc'
*varid = 'aw_net_sfc'

*varid = 'lh_sfc'
*varid = 'sh_sfc'

***varid = 'energy_net_sfc'


*varid = 'isccp_all'

*varid = 'isccp_all_vis'
*varid = 'isccp_all_vis_thin'
*varid = 'isccp_all_vis_med'
*varid = 'isccp_all_vis_thick'

*varid = 'isccp_high_vis'
*varid = 'isccp_middle_vis'
*varid = 'isccp_low_vis'
*varid = 'isccp_high_vis_thin'
*varid = 'isccp_high_vis_med'
*varid = 'isccp_high_vis_thick'
*varid = 'isccp_middle_vis_thin'
*varid = 'isccp_middle_vis_med'
*varid = 'isccp_middle_vis_thick'
*varid = 'isccp_low_vis_thin'
*varid = 'isccp_low_vis_med'
*varid = 'isccp_low_vis_thick'

*varid = 'isccp_ctp_all'
*varid = 'isccp_ctp_all_vis'
*varid = 'isccp_od_all_vis'


*varid = subwrd( args, 1 )
***************************************************************


***************************************************************
* Display style
***************************************************************
cbar = 'hor'
cbar.1 = '2'
cbar.2 = '6'

*cbar = 'ver'
*cvar.1 = '1'

*cbar = 'each'

mpdraw = 'on'
*mpdraw = 'off'

***** 3 raw figs. and 2 diff. figs *****
if( 1 = 1 )
  disp.1 = '1'   ; cont.1 = 'off'
  disp.2 = '2'   ; cont.2 = 'off'
  disp.3 = '3'   ; cont.3 = 'off'
*  disp.4 = '3 2' ; cont.4 = 'off'
  disp.4 = ''    ; cont.4 = 'off'
  disp.5 = '2 1' ; cont.5 = 'off'
  disp.6 = '3 1' ; cont.6 = 'off'
*  disp.4 = '3 1' ; cont.4 = 'off'
*  disp.5 = '3 2' ; cont.5 = 'off'
*  disp.6 = '' ; cont.6 = 'off'
endif
if( 1 != 1 )
  disp.1 = '1'   ; cont.1 = 'off'
  disp.2 = '2'   ; cont.2 = 'off'
  disp.3 = '3'   ; cont.3 = 'off'
  disp.4 = ''    ; cont.4 = 'off'
  disp.5 = '2 1' ; cont.5 = 'off'
  disp.6 = '3 2' ; cont.6 = 'off'
endif
*
***** 2 raw figs. and 1 diff. figs *****
if( 1 != 1 )
**  disp.1 = '1'   ; cont.1 = 'on'
*  disp.1 = '1'   ; cont.1 = 'off'
**  disp.2 = '2'   ; cont.2 = 'on'
*  disp.2 = '2'   ; cont.2 = 'off'
*  disp.3 = ''   ; cont.3 = 'off'
*  disp.4 = ''    ; cont.4 = 'off'
**  disp.5 = '2 1' ; cont.5 = 'on'
*  disp.5 = '2 1' ; cont.5 = 'off'
*  disp.6 = '' ; cont.6 = 'off'

*  disp.1 = '1'   ; cont.1 = 'off'
*  disp.2 = '2'   ; cont.2 = 'off'
*  disp.3 = '2 1'   ; cont.3 = 'off'
*  disp.4 = ''    ; cont.4 = 'off'
*  disp.5 = '' ; cont.5 = 'off'
*  disp.6 = '' ; cont.6 = 'off'

  disp.1 = ''    ; cont.1 = 'off'
  disp.2 = '1'   ; cont.2 = 'off'
  disp.3 = '2'   ; cont.3 = 'off'
  disp.4 = ''    ; cont.4 = 'off'
  disp.5 = ''    ; cont.5 = 'off'
  disp.6 = '2 1' ; cont.6 = 'off'
endif
*
***** raw figs. *****
if( 1 != 1 )
  disp.1 = '1' ; cont.1 = 'on'
  disp.2 = '2' ; cont.2 = 'on'
  disp.3 = '3' ; cont.3 = 'on'
  disp.4 = '4' ; cont.4 = 'on'
  disp.5 = '5' ; cont.5 = 'on'
  disp.6 = '6' ; cont.6 = 'on'
endif
if( 1 != 1 )
  disp.1 = '1' ; cont.1 = 'off'
  disp.2 = '' ; cont.2 = 'on'
  disp.3 = '' ; cont.3 = 'on'
  disp.4 = '' ; cont.4 = 'on'
  disp.5 = '' ; cont.5 = 'on'
  disp.6 = '' ; cont.6 = 'on'
endif
*
***** test figs. *****
if( 1 != 1 )
  disp.1 = '1'   ; cont.1 = 'off'
  disp.2 = '3'   ; cont.2 = 'off'
  disp.3 = '3 1'   ; cont.3 = 'off'
  disp.4 = '2' ; cont.4 = 'off'
  disp.5 = '3' ; cont.5 = 'off'
  disp.6 = '3 2' ; cont.6 = 'off'
endif
*
***** sensitivity experiments *****
if( 1 != 1 )
  disp.1 = '1 4'
  disp.2 = '2 4'
  disp.3 = '3 4'
  disp.4 = '4'
  disp.5 = '5 4'
  disp.6 = '6 4'
endif
***** for precipitation  *****
if( 1 != 1 )
  disp.1 = '1'   ; cont.1 = 'off'
  disp.2 = '2'   ; cont.2 = 'off'
  disp.3 = '3'   ; cont.3 = 'off'
  disp.4 = '4'   ; cont.4 = 'off'
  disp.5 = '5'   ; cont.5 = 'off'
  disp.6 = '6'   ; cont.6 = 'off'
endif
*
*
***************************************************************


***************************************************************
* Time
***************************************************************

***** monthly/seasonal mean *****
*year = 2004
*year = subwrd( args, 2 )

year=2004
month=6
*month=7
*month = 678
*month = 901
*month = 345
*month = subwrd( args, 2 )

***** start/end time *****
*time_start = '06jun2004'
**time_start = '18z10jun2004'
*time_endpp = '11jun2004'
*
*time_start = '01jun2004'
*time_endpp = '30aug2004'
*
*time_start = '03z01jan2000'
*time_endpp = '00z16apr2000'

*time_start = 'jan2000'
*time_endpp = 'apr2000'


***** climatological mean *****
*year = 'clim'

*year_start = 1978 ; year_end   = 1978
*month = 678
*month = 901
*month = 212

*year_start = 1979 ; year_end   = 1979
*month = 345
*month = 678
*month = 901
*month = 212

*year_start = 2004 ; year_end   = 2004

*year_start = 1979 ; year_end   = 1988
*year_start = 1980 ; year_end   = 1989
*year_start = 1988 ; year_end   = 1988

*year_start = 1984 ; year_end   = 1988
*year_start = 1985 ; year_end   = 1989

*year_start = 1979 ; year_end   = 1988
*year_start = 1979 ; year_end   = 1998
*year_start.2 = year_start + 96 ; year_end.2   = year_end + 96
*month=12
*month = 345
*month = 678
*month = 901
*month = 212
*month = 999

*time_start.1 = 'jun1979' ; time_end.1 = 'may1983'
*time_start.2 = 'jun2075' ; time_end.2 = 'may2079'


* for MIROC5
*year_start = 1980
***year_start = 1984  * for SRB3.0
***year_start = 1995   * for isccp
*year_end = 2004

* for kinmirai (MIROC3)
*year_start = 2003
***year_end = 2010
*year_end = 2008

* for MIROC t106 (MIROC3.2hi)
*year_start = 1980
***year_start = 1984  * for SRB3.0
***year_start = 1995 * for isccp
*year_end = 2002
*year_end = 2001  * for ???

*month = subwrd( args, 2 )


***************************************************************


***************************************************************
* Space
***************************************************************
region = 'global'
*region = 'indian'
*region = 'pacific'
*region = 'atlantic'
*region = 'indwpac'
*region = 'epac'
*region = 'atlantic'
*region = 'nhpac'
*region = 'nhatlantic'
*region = 'east_asia'
*region = 'lowlat'
*region = subwrd( args, 1 )
***************************************************************


***************************************************************
* Open list
***************************************************************
* time_start.f & time_end.f will be set from month without explicitly specifying.

f = 1
***************************************************************
if( 1 != 1 )
  ret = run_list( 'JRA125 'varid' -cdir sl/144x72/tstep' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )

  if( month = 345 )
    clim_arg.f = '01mar%y 31may%y 2000 2009'
  endif
  if( month = 678 )
    clim_arg.f = '01jun%y 31aug%y 2000 2009'
  endif
  if( month = 901 )
    clim_arg.f = '01sep%y 30nov%y 2000 2009'
  endif
  if( month = 212 )
    clim_arg.f = '01dec%y 28feb%ypp 2000 2008'
  endif

  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
*  cdir = 'monthly/surface'
  cdir = 'moda/sfc/240x121'
  ret = run_list( 'ERA_INTERIM 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  cdir = 'data_conv/surface/144x73/monthly'
  ret = run_list( 'NCEP1 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( 'SRB3.0 'varid' -time monthly_mean' )
*  ret = run_list( 'SRB3.0 'varid' -time daily_mean' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
*  cm   = cmonth( month, 3 )
*  clim_arg.f = cm % '%y ' % cm % '%y 1983 2004'
*  clim_arg.f = cm % '%y ' % cm % '%y 1984 2006'
  if( 1 != 1 )
    if( month = 345 )
      clim_arg.f = 'mar%y may%y 1984 2006'
    endif
    if( month = 678 )
      clim_arg.f = 'jun%y aug%y 1984 2006'
    endif
    if( month = 901 )
      clim_arg.f = 'sep%y nov%y 1984 2006'
    endif
    if( month = 212 )
      clim_arg.f = 'dec%y feb%ypp 1984 2005'
    endif
  endif
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( 'ERBE 'varid' -time monthly_mean' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )
  clim_arg.f = cm % '%y ' % cm % '%y 1985 1988'
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  cdir = 'monthly'
  ret = run_list( 'MODIS 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )
*  time_start.f = '01' % cm % '2008'
*  time_end.f   = '01' % cm % '2010'
  if( month <= 4 )
    clim_arg.f = cm % '%y ' % cm % '%y 2008 2011'
  else
    clim_arg.f = cm % '%y ' % cm % '%y 2008 2010'
  endif
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
  ret = run_list( 'CMAP 'varid  )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )
*  clim_arg.f = cm % '%y ' % cm % '%y 1979 2007'
*  clim_arg.f = cm % '%y ' % cm % '%y 1980 2004'
*  clim_arg.f = cm % '%y ' % cm % '%y 1979 1999'
*  clim_arg.f = cm % '%y ' % cm % '%y 2001 2009'
*  clim_arg.f = cm % '%y ' % cm % '%y -ylist 2001,2002,2004,2005,2006,2007,2008,2009'
*  clim_arg.f = 'jun%y aug%y -ylist 2001,2002,2004,2005,2006,2007,2008,2009'
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 = 1 )
  ret = run_list( 'GPCP 'varid  )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )

  if( 1 != 1 )
    clim_arg.f = cm % '%y ' % cm % '%y 1979 2004'
    if( month = 345 )
      clim_arg.f = 'mar%y may%y 1979 2004'
    endif
    if( month = 678 )
      clim_arg.f = 'jun%y aug%y 1979 2004'
    endif
    if( month = 901 )
     clim_arg.f = 'sep%y nov%y 1979 2004'
    endif
    if( month = 212 )
      clim_arg.f = 'dec%y feb%ypp 1979 2003'
    endif
  endif

  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
  ret = run_list( 'GSMaP_TMI 'varid' -cdir monthly' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )
*  clim_arg.f = cm % '%y ' % cm % '%y 1998 2006'
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
  ret = run_list( 'ISCCP_D1_OBS 'varid )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )

*  cm   = cmonth( month, 3 )
  if( month = 345 )
    clim_arg.f = 'mar%y may%y 1995 2008'
  endif
  if( month = 678 )
   clim_arg.f = 'jun%y aug%y 1995 2007'
  endif
  if( month = 901 )
    clim_arg.f = 'sep%y nov%y 1995 2007'
  endif
  if( month = 212 )
    clim_arg.f = 'dec%y feb%ypp 1995 2007'
  endif

  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
  ret = run_list( 'MIROC_cmip5_mAmO_20C_run01 'varid )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )
*  clim_arg.f = cm % '%y ' % cm % '%y 1980 2004'
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
  ret = run_list( 'MIROC_kinmirai_mAmO_AR4_SRES_LA_A1_01 'varid )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )
*  clim_arg.f = cm % '%y ' % cm % '%y 2003 2007'
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( 'MIROC_amip_t106 'varid )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )
*  clim_arg.f = cm % '%y ' % cm % '%y 1978 2002'
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
*  cdir = 'sl/144x72/3hr_tstep'
*  cdir = 'sl/144x72/30dy_mean'
  cdir = 'advanced/cosp_v1.3/2560x1280/30dy_mean/step4'
  ret = run_list( 'APE.ctl.gl09.by_iga 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  cdir = 'sl/144x72/tstep'
  ret = run_list( 'K.200406.L38.gl09.run06 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  cdir = 'sl/144x72/monthly_mean'
  ret = run_list( 'K.200406.N12.gl09.L38.a 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  cdir = 'sl/144x72/monthly_mean'
  ret = run_list( 'K.200406.N12.gl09.L38.a.005 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 = 1 )
  cdir = 'sl/144x72/monthly_mean'
*  cdir = 'isccp/144x72x49/monthly_mean'
  ret = run_list( 'K.200406.N12.gl09.L38.b 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 = 1 )
  cdir = 'sl/144x72/monthly_mean'
*  cdir = 'isccp/144x72x49/monthly_mean'
  ret = run_list( 'K.200406.N12.gl09.L38.b.001 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
*  cdir = 'sl/144x72/monthly_mean'
  cdir = 'isccp/144x72x49/monthly_mean'
  ret = run_list( 'K.200406.N12.gl09.L38.b.002 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  cdir = 'sl/144x72/tstep'
*  cdir = 'sl/144x72/monthly_mean'
*  cdir = 'sl/288x145/tstep'
  ret = run_list( 'K.200406.L38.gl09.gwd 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
*  cdir = 'sl/360x181/monthly_mean'
*  cdir = 'sl/360x181/tstep'
*  cdir = 'sl/288x145/tstep'
*  cdir = 'sl/144x72/monthly_mean'
  cdir = 'isccp/144x72x49/monthly_mean'
  ret = run_list( 'AMIP.N12.197806.gl09.L38.run01 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( 'AMIP2_BOUNDARY 'varid )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( 'AMIP2_BOUNDARY 'varid )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
*  cdir = 'sl/144x72/monthly_mean'
  cdir = 'isccp/144x72x49/monthly_mean'
  ret = run_list( 'AMIP.N12.207406.gl09.L38.run01 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  
*  cm   = cmonth( month, 3 )
*  clim_arg.f = cm % '%y ' % cm % '%y ' % (year_start+96) % ' ' % (year_end+96)
*
*  if( month = 345 )
*    clim_arg.f = 'mar%y may%y ' % (year_start+96) % ' ' % (year_end+96)
*  endif
*  if( month = 678 )
*    clim_arg.f = 'jun%y aug%y ' % (year_start+96) % ' ' % (year_end+96)
*  endif
*  if( month = 901 )
*    clim_arg.f = 'sep%y nov%y ' % (year_start+96) % ' ' % (year_end+96)
*  endif
*  if( month = 212 )
*    clim_arg.f = 'dec%y feb%ypp ' % (year_start+96) % ' ' % (year_end+96)
*  endif

  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
*  cdir = 'sl/144x72/3hr_tstep'
  cdir = 'sl/144x72/30dy_mean'
  ret = run_list( 'APE.p4k.gl09.by_iga 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
  cdir = 'sl/2560x1280/monthly_mean'
*  cdir = 'sl/144x72/monthly_mean'
  ret = run_list( '200406_AR5 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( '200406_GW 'varid' -time monthly_mean -lon native -lat native' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
*  cdir = 'sl/144x72/tstep'
*  cdir = 'ml_plev/320x160x18/monthly_mean'
  cdir = 'isccp/144x72x49/tstep'
  ret = run_list( '200406.new.prun2010.gl09 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
*  cdir = 'sl/144x72/tstep'
*  cdir = 'ml_plev/320x160x18/monthly_mean'
  cdir = 'isccp/144x72x49/tstep'
  ret = run_list( 'N12.ES.200406.gl09.L40.ndw6 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
*  cdir = 'sl/2560x1280/monthly_mean'
  cdir = 'sl/144x72/monthly_mean'
*  cdir = 'ml_plev/320x160x18/monthly_mean'
*  cdir = 'isccp/2560x1280x49/monthly_mean'
  ret = run_list( '200406.new 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
*  cdir = 'sl/2560x1280/monthly_mean'
*  cdir = 'sl/144x72/monthly_mean'
  cdir = 'sl/144x72/1dy_mean'
*  cdir = 'isccp/2560x1280x49/monthly_mean'
*  ret = run_list( '200406.new.prun2010.gl09 'varid' -cdir 'cdir )
  ret = run_list( '200406.new.prun2010.gl09_chikira_def 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
*  time_start.f = '01aug2004'
  time_start.f = '01jun2004'
  time_end.f   = '29aug2004'
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
  cdir = 'sl/144x73/monthly_mean'
  ret = run_list( 'CLIM_MATSIRO_200406.run18 'varid' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
*  cdir =  'data_conv/'year'/320x160/monthly_mean'
  cdir =  'data_conv/clim/320x160/monthly_mean'
  ret = run_list( 'COLA-NICAM 'varid' -cdir 'cdir )
*  ret = run_list( 'COLA-NICAM 'varid' -time monthly_mean -year 'year )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  run.f = run.f % ' 8yr'
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  cdir =  'clim/320x160_N80/tstep'
  cdir =  year'/320x160_N80/tstep'
  ret = run_list( 'COLA-IFS-T2047 'varid' -cdir 'cdir )
*  ret = run_list( 'COLA-NICAM 'varid' -time monthly_mean -year 'year )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
*  run.f = run.f % ' 8yr'
*  time_start.f = '06z01jun2004' ; time_end.f   = '00z01jul2004'
*  time_start.f = '06z01jul2004' ; time_end.f   = '00z01aug2004'
*  time_start.f = '06z01aug2004' ; time_end.f   = '00z01sep2004'
  time_start.f = '06z01jun2004' ; time_end.f   = '00z01sep2004'
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( 'CMIP_GW_GL9 'varid' -time monthly_mean -lon native -lat native' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

if( 1 != 1 )
  ret = run_list( '200404.new 'varid' -time native -lon native -lat native' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
* sensitivity experiments
***************************************************************

***************************************************************
if( 1 != 1 )
  ret = run_list( '200406.new_4water 'varid' -time native -lon zonal_mean' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( '200406.new_qicrt0 'varid' -time native -lon zonal_mean' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( '200406.new_qicrt0001 'varid' -time native -lon zonal_mean' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( '200406.new_qicrt0005 'varid' -time native -lon zonal_mean' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( '200406.new_qicrt001 'varid' -time native -lon zonal_mean' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  ret = run_list( '200406.new_qicrt01 'varid' -time native -lon zonal_mean' )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif



***************************************************************
* ISCCP
***************************************************************

***************************************************************
if( 1 != 1 )
  varid.f = 'isccp_high_vis'
  ret = run_list( 'ISCCP_D1_OBS 'varid.f )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif

  varid.f = 'isccp_middle_vis'
  ret = run_list( 'ISCCP_D1_OBS 'varid.f )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif

  varid.f = 'isccp_low_vis'
  ret = run_list( 'ISCCP_D1_OBS 'varid.f )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif

***************************************************************
if( 1 != 1 )
  cdir = 'isccp/2560x1280x49/monthly_mean'

  varid.f = 'isccp_high_vis'
  ret = run_list( '200406.new 'varid.f' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif

  varid.f = 'isccp_middle_vis'
  ret = run_list( '200406.new 'varid.f' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif

  varid.f = 'isccp_low_vis'
  ret = run_list( '200406.new 'varid.f' -cdir 'cdir )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif
endif


***************************************************************
if( 1 != 1 )
  varid.f = 'isccp_high_vis'
  ret = run_list( 'MIROC_cmip5_mAmO_20C_run01 'varid.f )
*  ret = run_list( 'MIROC_kinmirai_mAmO_AR4_SRES_LA_A1_01 'varid.f )
*  ret = run_list( 'MIROC_amip_t106 'varid.f )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif

  varid.f = 'isccp_middle_vis'
  ret = run_list( 'MIROC_cmip5_mAmO_20C_run01 'varid.f )
*  ret = run_list( 'MIROC_kinmirai_mAmO_AR4_SRES_LA_A1_01 'varid.f )
*  ret = run_list( 'MIROC_amip_t106 'varid.f )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif

  varid.f = 'isccp_low_vis'
  ret = run_list( 'MIROC_cmip5_mAmO_20C_run01 'varid.f )
*  ret = run_list( 'MIROC_kinmirai_mAmO_AR4_SRES_LA_A1_01 'varid.f )
*  ret = run_list( 'MIROC_amip_t106 'varid.f )
  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  cm   = cmonth( month, 3 )
  if( var.f != '' ) ; f2df.f = last() ; f = f + 1 ; endif

endif


***************************************************************
say ''
fmax = f - 1
***************************************************************

month2 = month
if( month < 10  ) ; month2 = '0' % month   ; endif
if( month = 345 ) ; month2 = 'MAM' ; endif
if( month = 678 ) ; month2 = 'JJA' ; endif
if( month = 901 ) ; month2 = 'SON' ; endif
if( month = 212 ) ; month2 = 'DJF' ; endif
if( month = 999 ) ; month2 = 'ANU' ; endif

save = 'lat_lon_with_zm_'varid'_'year'_'month2
*save = 'lat_lon_with_zm_'varid'_'region'_'year'_'month2
*save = 'lat_lon_with_zm_'varid'_'region'_'year_start'_'year_end'_'month2


***************************************************************
***************************************************************
***************************************************************
*
********** arguements from external file **********
else
*  cmd_fin = 'quit'
  cmd_fin = ''

  cbar = 'hor'
  cbar.1 = '2'
  cbar.2 = '5'

  cont.1 = 'off'
  cont.2 = 'off'
  cont.3 = 'off'
  cont.4 = 'off'
  cont.5 = 'off'
  cont.6 = 'off'

  mpdraw = 'on'

  cnf_fname = subwrd( args, 2 )

***** varid-name
  tmp = sublin( read( cnf_fname ), 2 )
  varid = subwrd( tmp, 1 )
  varid.1 = subwrd( tmp, 2 )
  varid.2 = subwrd( tmp, 3 )
  varid.3 = subwrd( tmp, 4 )
  varid.4 = subwrd( tmp, 5 )
  varid.5 = subwrd( tmp, 6 )
  varid.6 = subwrd( tmp, 7 )
  say 'varid = ' % varid

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
      year  = tmp.p
      say 'year  = ' % year
      p = p + 1 ; continue
    endif

    if( tmp.p = '-ym' )
*     e.g. year=2004, month=6
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      year  = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      month = tmp.p
      say 'year  = ' % year
      say 'month = ' % month
      p = p + 1 ; continue
    endif

    if( tmp.p = '-time' )
*     e.g. time_start=01jun2004, time_endpp=01sep2004 (if JJA)
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      time_start  = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      time_endpp  = tmp.p
      say 'time_start = ' % time_start
      say 'time_endpp = ' % time_endpp
      p = p + 1 ; continue
    endif

*    if( tmp.p = '-time.1' )
    if( tmph = '-time' )
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      time_start.tmpt  = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      time_endpp.tmpt  = tmp.p
      say 'time_start.' % tmpt % ' = ' % time_start.tmpt
      say 'time_endpp.' % tmpt % ' = ' % time_endpp.tmpt
      p = p + 1 ; continue
    endif

    if( tmp.p = '-clim' )
      year = 'clim'
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      year_start = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      year_end   = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      month      = tmp.p
      say year_start
      say year_end
      say month
      p = p + 1 ; continue
    endif

    if( tmph = '-clim' )
      year.tmpt = 'clim'
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      year_start.tmpt = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      year_end.tmpt   = tmp.p
      p = p + 1 ; tmp.p = subwrd( tmp, p )
      month.tmpt      = tmp.p
      say year_start.tmpt
      say year_end.tmpt
      say month.tmpt
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
*    year  = tmp2
*    month = tmp3
*    say 'year  = ' % year
*    say 'month = ' % month
*  endif
*  if( tmp1 = '-time' )
**   e.g. time_start=01jun2004, time_endpp=01sep2004 (if JJA)
*    time_start  = tmp2
*    time_endpp  = tmp3
*    say 'time_start = ' % time_start
*    say 'time_endpp = ' % time_endpp
*  endif
*  if( tmp1 = '-clim' )
*    year = 'clim'
*    year_start = tmp2
*    year_end   = tmp3
*    month      = tmp4
*    say year_start
*    say year_end
*    say month
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
  save = sublin( read( cnf_fname ), 2 )

***************************************************************
* Open list
***************************************************************
f = 1
fmax = dnum
while( f <= fmax )
  ret = run_list( dconf.f )

  run.f = subwrd( ret, 2 )
  var.f = subwrd( ret, 4 )
  if( var.f = '' )
    say 'error: file (#=' % f % ') does not exist'
    'quit'
  endif
  f2df.f = last()
  f = f + 1
endwhile


*****

endif
***************************************************************
***************************************************************
***************************************************************


if( region = 'global' | region = 'region' | region = ''   ) ; latmin = -90 ; latmax = 90 ; lonmin = 0   ; lonmax = 360 ; endif
if( region = 'indian'     ) ; latmin = -30 ; latmax = 30 ; lonmin = 0   ; lonmax = 120 ; endif
if( region = 'pacific'    ) ; latmin = -30 ; latmax = 30 ; lonmin = 120 ; lonmax = 240 ; endif
if( region = 'atlantic'   ) ; latmin = -30 ; latmax = 30 ; lonmin = 240 ; lonmax = 360 ; endif
if( region = 'indwpac'    ) ; latmin = -30 ; latmax = 30 ; lonmin = 60  ; lonmax = 180 ; endif
if( region = 'epac'       ) ; latmin = -30 ; latmax = 30 ; lonmin = 180 ; lonmax = 300 ; endif
if( region = 'atlantic'   ) ; latmin = -30 ; latmax = 30 ; lonmin = 240 ; lonmax = 360 ; endif
if( region = 'nhpac'      ) ; latmin = 20  ; latmax = 80 ; lonmin = 120 ; lonmax = 240 ; endif
if( region = 'nhatlantic' ) ; latmin = 20  ; latmax = 80 ; lonmin = 240 ; lonmax = 360 ; endif
if( region = 'east_asia'  ) ; latmin = 0   ; latmax = 50 ; lonmin = 80  ; lonmax = 180 ; endif
if( region = 'lowlat'     ) ; latmin = -60 ; latmax = 60 ; lonmin = 0   ; lonmax = 360 ; endif



***************************************************************
* Automatic Time Setting
***************************************************************
if( year = 'clim' ) ; year = '%y' ; endif

term = ''
if( time_start = 'time_start' | time_start = '' )
  if( month >= 1 & month <= 12 )
    cm   = cmonth( month, 3 )
    cmpp = cmonth( month+1, 3 )
    yearpp = year
    if( month = 12 )
      if( year = '%y' ) ; yearpp = '%ypp'
      else              ; yearpp = yearpp + 1 ; endif
    endif
    term = cmonth( month )
    time_start = '01'cm''year
    time_endpp = '01'cmpp''yearpp
  endif
  if( month = 345 )
    term = 'MAM'
    time_start = '01mar'year
    time_endpp = '01jun'year
  endif
  if( month = 678 )
    term = 'JJA'
    time_start = '01jun'year
    time_endpp = '01sep'year
  endif
  if( month = 901 )
    term = 'SON'
    time_start = '01sep'year
    time_endpp = '01dec'year
  endif
  if( month = 212 )
    term = 'DJF'
    if( year = '%y' ) ; yearpp = '%ypp'
    else              ; yearpp = year + 1 ; endif
    time_start = '01dec'year
    time_endpp = '01mar'yearpp
  endif
  if( month = 999 )
    term = 'ANU'
    if( year = '%y' ) ; yearpp = '%ypp'
    else              ; yearpp = year + 1 ; endif
    time_start = '01jan'year
    time_endpp = '01jan'yearpp
  endif
else
  term = time_start' <= time < 'time_endpp
  year = ''
endif



* time_start, time_end -> time_start.f, time_end.f
f = 1
flag = 0
while( f <= fmax )
  'set dfile 'f2df.f
  'set z 1'

  if( time_start.f != 'time_start.'f & time_start.f != '' )
    clim_arg.f = ''

    time_start.f = t2time( time2t( time_start.f ) )

    if( time_end.f = 'time_end.'f | time_end.f = '' )
      time_end.f   = t2time( time2t( time_endpp.f ) - 1 )
    endif

    run.f = run.f % '(' % time_start.f % '-' % time_end.f % ')'
    say run.f

  else ; if( clim_arg.f != 'clim_arg.'f & clim_arg.f != '' )
    time_start.f = ''
    time_end.f   = ''
    run.f = run.f % '(' % clim_arg.f % ')'
    say run.f

  else ; if( year = '%y' )

    if( valnum(year_start.f) != 1 )
      year_start.f = year_start
    endif
    if( valnum(year_end.f) != 1 )
      year_end.f = year_end
    endif

*   2001, 2002: dummy
    tmp = strrep( time_endpp, '%ypp', 2002 )
    tmp = strrep(        tmp, '%y'  , 2001 )
    tmp = t2time( time2t( tmp ) - 1 )
    tmp = strrep(        tmp, 2002, '%ypp' )
    time_end.f = strrep( tmp, 2001, '%y' )
*    tmp = strrep( time_endpp, '%ypp', year_end.f+1 )
*    tmp = strrep(        tmp, '%y'  , year_end.f )
*    tmp = t2time( time2t( tmp ) - 1 )
*    tmp = strrep(        tmp, year_end.f+1, '%ypp' )
*    time_end.f = strrep( tmp, year_end.f, '%y' )

    tmp = strrep( time_start, '%ypp', year_end.f+1 )
    tmp = strrep(        tmp, '%y'  , year_end.f )
    tmp = t2time( time2t( tmp ) )
    tmp = strrep(        tmp, year_end.f+1, '%ypp' )
    time_start.f = strrep( tmp, year_end.f, '%y' )

    clim_arg.f = time_start.f % ' ' % time_end.f % ' ' % year_start.f % ' ' % year_end.f
    say run.f % ': ' % clim_arg.f
    time_start.f = ''
    time_end.f   = ''

  else
    time_start.f = t2time( time2t( time_start ) )
    time_end.f   = t2time( time2t( time_endpp ) - 1 )
    clim_arg.f = ''
    say run.f % ': ' % time_start.f % ' - ' % time_end.f

  endif ; endif ; endif

  f = f + 1
endwhile
say ''

if( year = '%y' ) ; year = year_start % '_' year_end  ; endif

***************************************************************
* Automatic Variable Setting
***************************************************************
f = 1
while( f <= fmax )
  if( varid.f = 'varid.'f | varid.f = '' ) ; varid.f = varid ; endif
  say f % ': ' % varid.f
  f = f + 1
endwhile

*exit
***************************************************************
* Variable List
***************************************************************
f = 1
while( f <= fmax )
  sname.f = ''

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
    tmp1 = substr(varid.f,1,target_len)
    tmp2 = math_strlen(varid.f)
    if( tmp1 = target.tar & tmp2 > target_len )
      varid_base = tmp1
      varid_lev = substr(varid.f,target_len+1,tmp2-target_len)
    endif
    tar = tar + 1
  endwhile


* variable
  if( varid.f = 'iwp' )
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

  if( varid.f = 'lwp' )
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

  if( varid.f = 'pt_700_minus_925' )
    name.f = '`3z`0`b700`n-`3z`0`b925`n'
    unit.f = 'K'
    min2d.f  = 10 ; int2d.f  = 2 ; max2d.f  = 30
    dmin2d.f = -5 ; dint2d.f = 1 ; dmax2d.f = 5
    min1d.f  = 10 ; int1d.f  = 5 ; max1d.f  = 30
    dmin1d.f = -5 ; dint1d.f = 2.5 ; dmax1d.f = 5
    color.f = 'grainbow'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'pt_z3000s_minus_z500s' )
    name.f = '`3z`0`b700`n-`3z`0`b925`n'
    unit.f = 'K'
    min2d.f  = 10 ; int2d.f  = 2 ; max2d.f  = 30
    dmin2d.f = -5 ; dint2d.f = 1 ; dmax2d.f = 5
    min1d.f  = 10 ; int1d.f  = 5 ; max1d.f  = 30
    dmin1d.f = -5 ; dint1d.f = 2.5 ; dmax1d.f = 5
    color.f = 'grainbow'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'precip' )
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

  if( varid.f = 'qv2m' )
    name.f = '2m Specif Humidity'
    unit.f = 'g/kg'
    min2d.f  = 2  ; int2d.f  = 2   ; max2d.f  = 20
    dmin2d.f = -2 ; dint2d.f = 0.4 ; dmax2d.f = 2
    min1d.f  = 0  ; int1d.f  = 5   ; max1d.f  = 20
    dmin1d.f = -2 ; dint1d.f = 1   ; dmax1d.f = 2
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid_base = 'qv' & valnum(varid_lev) != 0 )
    name.f = 'Specif Humidity @ 'varid_lev'hPa'
    unit.f = 'g/kg'
    min2d.f  = 2  ; int2d.f  = 2   ; max2d.f  = 20
    dmin2d.f = -5 ; dint2d.f = 1   ; dmax2d.f = 5
    min1d.f  = 0  ; int1d.f  = 5   ; max1d.f  = 20
    dmin1d.f = -5 ; dint1d.f = 1   ; dmax1d.f = 5
    if( varid_lev <= 500 )
      min2d.f  = 1    ; int2d.f  = 1   ; max2d.f  = 10
      dmin2d.f = -2.5 ; dint2d.f = 0.5 ; dmax2d.f = 2.5
      min1d.f  = 0    ; int1d.f  = 2.5 ; max1d.f  = 10
      dmin1d.f = -2   ; dint1d.f = 1   ; dmax1d.f = 2
    endif
    if( varid_lev <= 300 )
      min2d.f  = 0.2  ; int2d.f  = 0.2  ; max2d.f  = 2.0
      dmin2d.f = -0.5 ; dint2d.f = 0.1  ; dmax2d.f = 0.5
      min1d.f  = 0    ; int1d.f  = 0.5  ; max1d.f  = 2.0
      dmin1d.f = -0.5 ; dint1d.f = 0.25 ; dmax1d.f = 0.5
    endif
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid_base = 'rh' & valnum(varid_lev) != 0 )
    name.f = 'Relative Humidity @ 'varid_lev'hPa'
    unit.f = '%'
    min2d.f  = 10  ; int2d.f  = 10 ; max2d.f  = 100
    dmin2d.f = -50 ; dint2d.f = 10 ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 25 ; max1d.f  = 100
    dmin1d.f = -20 ; dint1d.f = 10 ; dmax1d.f = 20
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 't2m' )
    name.f = '2m Temperature'
    unit.f = 'K'
    min2d.f  = 200 ; int2d.f  = 10 ; max2d.f  = 320
    dmin2d.f = -10 ; dint2d.f = 1  ; dmax2d.f = 10
    min1d.f  = 220 ; int1d.f  = 30 ; max1d.f  = 310
    dmin1d.f = -6  ; dint1d.f = 3  ; dmax1d.f = 6
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid_base = 't' & valnum(varid_lev) != 0 )
    name.f = 'Temperature @ 'varid_lev'hPa'
    unit.f = '%'
    min2d.f  = 220 ; int2d.f  = 5 ; max2d.f  = 300
    dmin2d.f = -10 ; dint2d.f = 1  ; dmax2d.f = 10
    min1d.f  = 220 ; int1d.f  = 30 ; max1d.f  = 300
    dmin1d.f = -6  ; dint1d.f = 3  ; dmax1d.f = 6
    if( varid_lev <= 500 )
      min2d.f  = 200 ; int2d.f  = 5 ; max2d.f  = 280
      dmin2d.f = -10 ; dint2d.f = 1  ; dmax2d.f = 10
      min1d.f  = 200 ; int1d.f  = 30 ; max1d.f  = 280
      dmin1d.f = -6  ; dint1d.f = 3  ; dmax1d.f = 6
    endif
    if( varid_lev <= 300 )
      min2d.f  = 180 ; int2d.f  = 5 ; max2d.f  = 260
      dmin2d.f = -10 ; dint2d.f = 1  ; dmax2d.f = 10
      min1d.f  = 180 ; int1d.f  = 30 ; max1d.f  = 260
      dmin1d.f = -6  ; dint1d.f = 3  ; dmax1d.f = 6
    endif
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'sst' )
    name.f = 'Sea Surface Temperature'
    unit.f = 'K'
    min2d.f  = 273 ; int2d.f  = 3 ; max2d.f  = 306
    dmin2d.f = -3  ; dint2d.f = 0.5  ; dmax2d.f = 3
    min1d.f  = 270 ; int1d.f  = 10 ; max1d.f  = 306
    dmin1d.f = -3  ; dint1d.f = 1.5  ; dmax1d.f = 3
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'mslp' )
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

  if( varid.f = 'icr' )
    name.f = 'Sea Ice Fraction'
    unit.f = '%'
    min2d.f  = 10 ; int2d.f  = 10 ; max2d.f  = 90
    dmin2d.f = -25  ; dint2d.f = 5  ; dmax2d.f = 25
    min1d.f  = 0 ; int1d.f  = 25 ; max1d.f  = 100
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'ice' )
    name.f = 'Sea Ice Mass'
    unit.f = 'kg/m`a2`n'
    min2d.f  = 200 ; int2d.f  = 200 ; max2d.f  = 2000
    dmin2d.f = -100  ; dint2d.f = 10  ; dmax2d.f = 100
    min1d.f  = 0 ; int1d.f  = 500 ; max1d.f  = 2000
    dmin1d.f = -500  ; dint1d.f = 100  ; dmax1d.f = 500
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid_base = 'u' & valnum(varid_lev) != 0 )
    name.f = 'Zonal Wind @ 'varid_lev'hPa'
    unit.f = 'm/s'
    min2d.f  = -30 ; int2d.f  = 5  ; max2d.f  = 30
    dmin2d.f = -10 ; dint2d.f = 2  ; dmax2d.f = 10
    min1d.f  = -30 ; int1d.f  = 15 ; max1d.f  = 30
    dmin1d.f = -10 ; dint1d.f = 5  ; dmax1d.f = 10
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'lw_up_toa' | varid.f = 'lw_up_clr_toa' )
    name.f = 'Upward Longwave Radiation @ TOA'
    if( varid.f = 'lw_up_clr_toa' ) ; name.f = name.f % ' (Clear Sky)' ; endif
    unit.f = 'W/m^2'
    min2d.f  = 100 ; int2d.f  = 20  ; max2d.f  = 340
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 100 ; int1d.f  = 50  ; max1d.f  = 300
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'lw_crf_toa' )
    name.f = 'Longwave Cloud Radiative Forcing @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = -100 ; int2d.f  = 20  ; max2d.f  = 100
    dmin2d.f = -50  ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -100 ; int1d.f  = 50  ; max1d.f  = 100
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'lw_up_sfc' )
    name.f = 'Upward Longwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = 100 ; int2d.f  = 30  ; max2d.f  = 480
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 100 ; int1d.f  = 200 ; max1d.f  = 500
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'lw_down_sfc' )
    name.f = 'Downward Longwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = 100 ; int2d.f  = 30  ; max2d.f  = 480
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 100 ; int1d.f  = 200 ; max1d.f  = 500
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'sw_up_toa' | varid.f = 'sw_up_clr_toa' )
    name.f = 'Upward Shortwave Radiation @ TOA'
    if( varid.f = 'sw_up_clr_toa' ) ; name.f = name.f % ' (Clear Sky)' ; endif
    unit.f = 'W/m^2'
    min2d.f  = 0   ; int2d.f  = 40  ; max2d.f  = 400
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 300
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'sw_crf_toa' )
    name.f = 'Shortwave Cloud Radiative Forcing @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = -100 ; int2d.f  = 20  ; max2d.f  = 100
    dmin2d.f = -50  ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -100 ; int1d.f  = 50  ; max1d.f  = 100
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'sw_up_sfc' )
    name.f = 'Upward Shortwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = 0   ; int2d.f  = 20  ; max2d.f  = 200
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'sw_down_toa' )
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

  if( varid.f = 'sw_down_sfc' )
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

  if( varid.f = 'sw_net_toa' )
    name.f = 'Down-Upward Shortwave Radiation @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = 0   ; int2d.f  = 40  ; max2d.f  = 400
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 300
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'lw_net_sfc' )
    name.f = 'Down-Upward Longwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = -200; int2d.f  = 20  ; max2d.f  = 0
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -100; int1d.f  = 50  ; max1d.f  = 0
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'sw_net_sfc' )
    name.f = 'Down-Upward Shortwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = 0   ; int2d.f  = 40  ; max2d.f  = 400
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = 0   ; int1d.f  = 100 ; max1d.f  = 300
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'aw_net_toa' )
    name.f = 'Down-Upward Long+Shortwave Radiation @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = -200; int2d.f  = 40  ; max2d.f  = 200
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -200; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'aw_crf_toa' )
    name.f = 'Long+Shortwave Cloud Radiative Forcing @ TOA'
    unit.f = 'W/m^2'
    min2d.f  = -100 ; int2d.f  = 20  ; max2d.f  = 100
    dmin2d.f = -50  ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -100 ; int1d.f  = 50  ; max1d.f  = 100
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'aw_net_sfc' )
    name.f = 'Down-Upward Long+Shortwave Radiation @ Surface'
    unit.f = 'W/m^2'
    min2d.f  = -200; int2d.f  = 40  ; max2d.f  = 200
    dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
    min1d.f  = -200; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -50 ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->blue->aqua->lime->yellow->red->maroon'
    dcolor.f = 'bluered'
  endif

  if( varid.f = 'sh_sfc' | varid.f = 'lh_sfc' )
    if( varid.f = 'sh_sfc' ) ; name.f = 'Surface Sensible Heat Flux' ; endif
    if( varid.f = 'lh_sfc' ) ; name.f = 'Surface Latent Heat Flux' ; endif
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

  if( varid.f = 'energy_net_sfc' )
    name.f = 'Net Downward Surface Energy Flux'
    unit.f = 'W/m^2'
    min2d.f  = -200 ; int2d.f  = 40  ; max2d.f  = 200
    dmin2d.f = -100 ; dint2d.f = 20  ; dmax2d.f = 100
    min1d.f  = -200 ; int1d.f  = 100 ; max1d.f  = 200
    dmin1d.f = -50  ; dint1d.f = 25  ; dmax1d.f = 50
    color.f = 'purple->bluered->maroon'
    dcolor.f = 'purple->bluered->maroon'
  endif

  if( varid.f = 'land_wg_z1' | varid.f = 'land_wg_z2' | varid.f = 'land_wg_z3' | varid.f = 'land_wg_z4' | varid.f = 'land_wg_z5' )
    if( varid.f = 'land_wg_z1' ) ; name.f = 'Soil Water @ z=1' ; endif
    if( varid.f = 'land_wg_z2' ) ; name.f = 'Soil Water @ z=2' ; endif
    if( varid.f = 'land_wg_z3' ) ; name.f = 'Soil Water @ z=3' ; endif
    if( varid.f = 'land_wg_z4' ) ; name.f = 'Soil Water @ z=4' ; endif
    if( varid.f = 'land_wg_z5' ) ; name.f = 'Soil Water @ z=5' ; endif
    unit.f = '0-1'
    min2d.f  = 0    ; int2d.f  = 0.1 ; max2d.f  = 1
    dmin2d.f = -0.5 ; dint2d.f = 0.1 ; dmax2d.f = 0.5
    min1d.f  = 0    ; int1d.f  = 0.5 ; max1d.f  = 1
    dmin1d.f = -0.5 ; dint1d.f = 0.1 ; dmax1d.f = 0.5
    color.f = 'grainbow'
    dcolor.f = 'purple->bluered->maroon'
  endif

  tmp = substr( varid.f, 1, 5 )
  if( tmp = 'isccp' )
    if( varid.f = 'isccp_ctp_all' | varid.f = 'isccp_ctp_all_vis' )
      name.f = 'Cloud Top Pressure by ISCCP'
      tmp = substr( varid.f, 7, 20 )
      sname.f = ', ' % tmp
      unit.f = '%'
      min2d.f  = 100 ; int2d.f  = 100 ; max2d.f  = 900
      dmin2d.f = -50 ; dint2d.f = 10  ; dmax2d.f = 50
      min1d.f  = 100 ; int1d.f  = 200 ; max1d.f  = 900
      dmin1d.f = -50 ; dint1d.f = 25 ; dmax1d.f = 50
      color.f  = 'white-(0)->grainbow'
      dcolor.f = 'purple->blue->white->red->brown'
    else ; if( varid.f = 'isccp_od_all' | varid.f = 'isccp_od_all_vis' )
      name.f = 'log(Cloud Optical Depth) by ISCCP'
      tmp = substr( varid.f, 7, 20 )
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
      tmp = substr( varid.f, 7, 20 )
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
*if( varid = 'iwp' )
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
*if( varid = 'lwp' )
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
*if( varid = 'pt_700_minus_925' )
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
*if( varid = 'pt_z3000s_minus_z500s' )
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
*if( varid = 'precip' )
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
*if( varid = 'qv2m' )
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
*if( varid = 't2m' )
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
*if( varid = 'lw_up_toa' | varid = 'lw_up_clr_toa' )
*  name = 'Upward Longwave Radiation @ TOA'
*  if( varid = 'lw_up_clr_toa' ) ; name = name % ' (Clear Sky)' ; endif
*  unit = 'W/m^2'
*  min2d  = 100 ; int2d  = 20  ; max2d  = 340
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 100 ; int1d  = 50  ; max1d  = 300
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( varid = 'lw_crf_toa' )
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
*if( varid = 'lw_up_sfc' )
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
*if( varid = 'lw_down_sfc' )
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
*if( varid = 'sw_up_toa' | varid = 'sw_up_clr_toa' )
*  name = 'Upward Shortwave Radiation @ TOA'
*  if( varid = 'sw_up_clr_toa' ) ; name = name % ' (Clear Sky)' ; endif
*  unit = 'W/m^2'
*  min2d  = 0   ; int2d  = 40  ; max2d  = 400
*  dmin2d = -50 ; dint2d = 10  ; dmax2d = 50
*  min1d  = 0   ; int1d  = 100 ; max1d  = 300
*  dmin1d = -50 ; dint1d = 25  ; dmax1d = 50
*  color = 'purple->blue->aqua->lime->yellow->red->maroon'
*  dcolor = 'bluered'
*endif
*
*if( varid = 'sw_crf_toa' )
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
*if( varid = 'sw_up_sfc' )
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
*if( varid = 'sw_down_toa' )
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
*if( varid = 'sw_down_sfc' )
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
*if( varid = 'sw_net_toa' )
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
*if( varid = 'lw_net_sfc' )
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
*if( varid = 'sw_net_sfc' )
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
*if( varid = 'aw_net_toa' )
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
*if( varid = 'aw_crf_toa' )
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
*if( varid = 'aw_net_sfc' )
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
*if( varid = 'sh_sfc' | varid = 'lh_sfc' )
*  if( varid = 'sh_sfc' ) ; name = 'Surface Sensible Heat Flux' ; endif
*  if( varid = 'lh_sfc' ) ; name = 'Surface Latent Heat Flux' ; endif
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
*if( varid = 'energy_net_sfc' )
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
*if( varid = 'land_wg_z1' | varid = 'land_wg_z2' | varid = 'land_wg_z3' | varid = 'land_wg_z4' | varid = 'land_wg_z5' )
*  if( varid = 'land_wg_z1' ) ; name = 'Soil Water @ z=1' ; endif
*  if( varid = 'land_wg_z2' ) ; name = 'Soil Water @ z=2' ; endif
*  if( varid = 'land_wg_z3' ) ; name = 'Soil Water @ z=3' ; endif
*  if( varid = 'land_wg_z4' ) ; name = 'Soil Water @ z=4' ; endif
*  if( varid = 'land_wg_z5' ) ; name = 'Soil Water @ z=5' ; endif
*  unit = '0-1'
*  min2d  = 0    ; int2d  = 0.1 ; max2d  = 1
*  dmin2d = -0.5 ; dint2d = 0.1 ; dmax2d = 0.5
*  min1d  = 0    ; int1d  = 0.5 ; max1d  = 1
*  dmin1d = -0.5 ; dint1d = 0.1 ; dmax1d = 0.5
*  color = 'grainbow'
*  dcolor = 'purple->bluered->maroon'
*endif
*
*if( varid = 'isccp_high_vis' )
*  name = 'ISCCP Visible Cloud Fraction'
*  if( varid = 'isccp_high_vis' ) ; sname = 'High' ; endif
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
*if( fmax > 3 )
*  f = 1
*  while( f <= fmax )
*    if( f > 6 ) ; break ; endif
*    i = f
*    j = 2
*    if( i >= 4 ) ; i = i - 3 ; j = j - 1 ; endif
*    xpos = 3.8 * i - 3.7
*    ypos = 0.15 * j - 0.05
*    'draw string 'xpos' 'ypos' 'time_start.f' <= 'run.f' <= 'time_end.f
*    f = f + 1 
*  endwhile
*endif
** vertical style
*if( fmax <= 3 )
*  f = 1
*  while( f <= fmax )
*    xpos = 0.1
*    ypos = 0.15 * (fmax-f+1) - 0.05
**    'draw string 'xpos' 'ypos' 'time_start.f' <= 'run.f' <= 'time_end.f
*    f = f + 1 
*  endwhile
*endif



***************************************************************
* Calculate
***************************************************************
f = 1
while( f <= fmax )
  say 'Processing #'f
  'set dfile 'f2df.f
  'set lat 'latmin' 'latmax
  'set lon 'lonmin' 'lonmax
  'set z 1'
  'set t 1'
  if( time_start.f != '' & time_end.f != '' )
    say 'v'f' = ave( 'var.f', time='time_start.f', time='time_end.f' )'
    'v'f' = ave( 'var.f', time='time_start.f', time='time_end.f' )'
  endif

  if( clim_arg.f != '' )
*    'clave2 'var.f' 'clim_arg.f' v'f
    say 'clave 'var.f' 'clim_arg.f' v'f
    'clave 'var.f' 'clim_arg.f' v'f
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
  'set mpdraw 'mpdraw

  f1 = subwrd( disp.d, 1 )
  f2 = subwrd( disp.d, 2 )

  if( f1 = '' ) ; d = d + 1 ; continue ;  endif
  'set dfile 'f2df.f1
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
  if( cbar.i = d )
    xposmin = 5.0 * i - 3.6
    xposmax = xposmin + 4.3
    'q shades'
    if( sublin(result,1) != 'None' )
      'xcbar 'xposmin' 'xposmax' 0.4 0.6 -edge triangle -line on -fstep 2'
    endif
  endif

  if( cont.d = 'on' )
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
  if( f2 = '' ) ; 'draws ('run.f1')' % sname.f1
  else ; 'draws ('run.f1') - ('run.f2')' % sname.f1 ; endif

*  if( d = 1 )
*    'setfont normal'
*    'draws -yoffset 0.25 -pos tl -base bl 'name' for 'term' ['unit']'
    'setfont normal -base tl'
*    'draw string 1.4 8.4 'name' for 'term' 'year' ['unit']'
    'draw string 1.4 8.4 'name.f1' for 'term' 'year' ['unit.f1']'
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
*    'draws ('run.f1') - ('run.f2')'
*
*  endif


  d = d + 1
endwhile



if( save != 'save' & save != '' )
  'save 'save
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
