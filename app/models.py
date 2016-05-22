from app import db



userGroup = db.Table('userGroup', db.Model.metadata,
	db.Column('user_id',db.Integer,db.ForeignKey('user.id')),
	db.Column('group_id',db.Integer,db.ForeignKey('groups.id')))

groupTemplate = db.Table('groupTemplate',db.Model.metadata,
	db.Column('group_id',db.Integer,db.ForeignKey('groups.id')),
	db.Column('template_id',db.Integer,db.ForeignKey('template.id')))



class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(64), index=True, unique=True)
	name = db.Column(db.String(64))
	email = db.Column(db.String(120), index=True, unique=True)
	active = db.Column(db.Boolean, default= True)
	action = db.relationship('Action',backref='user',lazy='dynamic')
	groups = db.relationship(
        "Groups",
        secondary = userGroup,
        back_populates="users")
	password = db.Column(db.String)

	def is_authenticated(self):
		return True

	def is_active(self):
		return True

	def is_anonymous(self):
		return False

	def get_id(self):
		try:
			return unicode(self.id)
		except NameError:
			return str(self.id)

	def get_groups(self):
            return self.groups
	
	def get_json(self):
		my_groups = []
		for group in self.groups:
			my_groups.append(group.groupName)
		return {'username': self.username, 'email': self.email, 'groups': my_groups}

	def __repr__(self):
		return '<User %r>' % (self.username)


class Groups(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	groupName = db.Column(db.String(64), index=True, unique=True)
	active = db.Column(db.Boolean, default = True)
	users = db.relationship('User',
							secondary = userGroup,
							back_populates = 'groups')
	Templates = db.relationship('Template',
								secondary = groupTemplate,
								backref = 'groups')
	parent_id = db.Column(db.Integer,db.ForeignKey('groups.id'))
	parent = db.relationship('Groups',lazy = True, backref = 'children', remote_side = [id])

	def get_json(self):
		my_templates = []
		for template in self.Templates:
			my_templates.append(template.name)
		my_parent = None
		if self.parent is not None:
			my_parent = self.parent.groupName
		return {'groupname': self.groupName, 'parent': my_parent, 'templates': my_templates}

	def __repr__(self):
		return '<Group %r>' % (self.groupName)




class Template(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String, index = True, unique = True)
	filename = db.Column(db.String)
	active = db.Column(db.Boolean, default = True)
	data = db.relationship('Data',backref = 'template',lazy = 'dynamic')
	Groups = db.relationship('Groups',
							secondary = groupTemplate,
							backref = 'template')

	def get_json(self):
		return {'name': self.name, 'filename': self.filename}

	def __repr__(self):
		return '<Template %r>' % (self.name)


class Data(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	data = db.Column(db.String)
	template_id = db.Column(db.Integer, db.ForeignKey('template.id'))
	active = db.Column(db.Boolean, default=True)
	#files = db.relationship('File',backref = 'Data', uselist = False)
	file_id = db.Column(db.Integer, db.ForeignKey('file.id'))

	def __repr__(self):
		return '<Data %r>' % (self.data)

class File(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String)
	filename = db.Column(db.String)
	

class Action(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    action = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
		return '<Action %r>' % (self.action)