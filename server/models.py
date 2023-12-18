from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

#Remember to Serialize when all tables are added

db = SQLAlchemy()

class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String, unique=True)
    lastname = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String, unique=True)
    address = db.Column(db.String, unique=True)
    created_at = db.Column(db.DateTime(), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), onupdate=db.func.now())

    # orders = relationship('Order', back_populates='customer')
    items = association_proxy('orders', 'item',
        creator=lambda it: Review(item=it))


    def __repr__(self):
        return f'<Customer Item {self.firstname}>'
    @validates("firstname", "lastname")
    def validate_names(self,key,name):
        if not name:
            raise ValueError('Name Field is required')
        return name
    
    @validates("email")
    def validate_email(self,key,value):
        if '@' not in value:
            raise ValueError('Please enter a valid email')
        return value

class Item(db.Model, SerializerMixin):
    __tablename__ = 'items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    price = db.Column(db.Integer)
    category = db.Column(db.String)
    imageUrl= db.Column(db.Text)
    rating = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), onupdate=db.func.now())

    def __repr__(self):
        return f'<Item {self.name}, {self.price}, {self.description}, {self.category}, {self.imageUrl},{self.quantity}>'
    
    @validates("rating")
    def validate_email(self,key,value):
        if 0 > value > 6 not in value:
            raise ValueError('Please provide a value between 0 - 6')
        return value



class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.String)
    orderdate = db.Column(db.DateTime(), server_default=db.func.now())
    price = db.Column(db.Integer)
    status = db.Column(db.String)
    # created_at = db.Column(db.DateTime(), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), onupdate=db.func.now())
    customer_id = db.Column(db.Integer(), db.ForeignKey('customers.id'))
    item_id = db.Column(db.Integer(), db.ForeignKey('items.id'))

    customer = db.relationship("Customer")
    items = db.relationship("Item")



class Payment(db.Model, SerializerMixin):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    paymentdate = db.Column(db.Integer)
    paymentmedhod = db.Column(db.String)
    amount = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), onupdate=db.func.now())

    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    date = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), onupdate=db.func.now())

    customer_id = db.Column(db.Integer(), db.ForeignKey('customers.id'))
    item_id = db.Column(db.Integer(), db.ForeignKey('items.id'))

    customer = db.relationship("Customer")



    
class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(), onupdate=db.func.now())

    customer_id = db.Column(db.Integer(), db.ForeignKey('customers.id'))
    item_id = db.Column(db.Integer(), db.ForeignKey('items.id'))

    item = db.relationship("Item")










