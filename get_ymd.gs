* grads -blc "get_ymd.gs runid [output-filename]"
function get_ymd( args )
  rc = gsfallow( 'on' )
  rc = gsfpath( 'database' )
  runid  = subwrd( args, 1 )
  output = subwrd( args, 2 )

  tmp = rl_get_ymd( runid )

  if( output != '' )
    ret = write( output, tmp )
  else
    say tmp
  endif

return
