import sys, pygn, json
print 'loading'
f = open('../all.tags.json', 'r')
s = f.read()
j = json.loads(s)
f.close()
print 'client...'
clientID = '582912-203D3664F314C618AF20562C0EF17B5E' # Enter your Client ID from developer.gracenote.com here
#userID = '259611467494464959-6A2DAD2AB9C1A6189167742A9F3105BE' # Get a User ID from pygn.register() - Only register once per end-user
#userID = '260455892557887637-F2F5BEDBA4FA97FDCBD92A3EA72F0F3B'
userID = pygn.register(clientID)
print userID
print '\nSearch"\n'
print j[0]['artist'][0]
s = 'Lyle Lovett'
#sys.exit(0)
result = pygn.search(clientID=clientID, userID=userID, artist=s)
print json.dumps(result, sort_keys=True, indent=4)