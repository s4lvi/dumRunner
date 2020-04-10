import random
class ObjTracker():
    objects = {}
    def __init__(self):
        print("Object tracker initialized")

    def addObject(self, oType, o):
        if (self.objects.get(oType) == None):
            self.objects[oType] = []
        self.objects[oType].append(o)
        print("Added object", o, "of type", oType)

    def listAllObjects(self):
        print("Listing all objects in tracker")
        for t in self.objects.keys():
            print("Type", t)
            objects = self.objects.get(t)
            for o in objects:
                print(o.id)

    def listTypeObjects(self, t):
        print("Listing objects of type", t)
        objects = self.objects.get(t)
        for o in objects:
            print(o.id)

class Player():
    def __init__(self, name="Unnamed_Player"):
        if (name == "Unnamed_Player"):
            name = name + str(random.randint(0,100))
        self.name = name
        self.id = name
        TRACKER.addObject('player', self)
        print("Player", name, "created")
