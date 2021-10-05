# configure api key
# set by CircleCI; uncomment and set for debugging
#export FOSSA_API_KEY=<get this from vouch.fossa.app>

# run dependency analysis in the current
# directory, uploading results to FOSSA
/usr/local/bin/fossa analyze

# check for FOSSA license- and vulnerability-scan results
/usr/local/bin/fossa test
