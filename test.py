import json

class Meta(type):
    def __new__(meta, name, bases, class_dict):
        print((meta, name, bases, class_dict))
        return type.__new__(meta, name, bases, class_dict)

class Myclass(object, metaclass=Meta):
    stuff = 123

    def foo(self):
        pass

class Serializable(object):
    def __init__(self, *args):
        self.args = args
    
    def serialize(self):
        return json.dumps({'args': self.args})

class Point2D(Serializable):
    def __init__(self, x, y):
        super().__init__(x, y)
        self.x = x
        self.y = y

    def __repr__(self):
        return 'Point2D({}, {})'.format(self.x, self.y)

point = Point2D(5, 3)
print('Object: ', point)
print('Serialized: ', point.serialize())