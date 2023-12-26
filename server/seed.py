from random import choice, randint, random
import json 
from faker import Faker
from app import app
from models import db, Customer, Item

with open("/home/mwagash/ecommerce-app/client/db.json", mode="r") as itemdata:
    data = json.load(itemdata)

item_data = [item for item in data]

# print(data)

fake = Faker()

with app.app_context():

    Item.query.delete()
    Customer.query.delete()
    db.session.commit()

    customers = []
    passwords = ['michael', 'gooseman', 'trident', 'kenyanboys', 'nomatch', 'CIA-123', 'Benjo']
    for n in range(15):
        customer = Customer(firstname=fake.first_name(), lastname=fake.last_name(), email=fake.email(), address=fake.address(), password=f"{choice(passwords)}{randint(3,30)}")
        customers.append(customer)

        db.session.add_all(customers)

    items = []
    rating = [1, 2, 3, 4, 5]
    for n in data["products"]:
        item = Item(name= n["name"], price=n["price"], description=n["description"], category=n["category"], quantity=n["stock"], imageUrl=n["image_url"], rating=choice(rating)) #, customer=choice(customers)
        items.append(item)
        
    # print(items)
        db.session.add_all(items)
        db.session.commit()
