from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_session import Session
from models import db, Customer, Item, Order, Payment, Review, Favorite
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://our_market_user:US63J3aNWXke1RJDKL7m408cYHQMv1xw@dpg-cm058bed3nmc738jof9g-a.frankfurt-postgres.render.com/our_market"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = 'sqlalchemy'

app.config['SESSION_SQLALCHEMY'] = db
Session(app)
app.json.compact = False
app.secret_key = 'no_key'

migrate = Migrate(app, db)
CORS(app)
db.init_app(app)

api = Api(app)


class Index(Resource):

    @staticmethod
    def get():
        response_dict = {
            "index": "Welcome to the Project RESTful API",
        }

        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response

api.add_resource(Index, '/')

class LogIn(Resource):

    @staticmethod
    def post():
        user = Customer.query.filter_by(lastname=request.get_json()['username']).first()
        
        response = make_response(
            jsonify(user.to_dict()),
            201,
        )
        return response

api.add_resource(LogIn, '/login')

# class UserSession(Resource):

class Customers(Resource):

    @staticmethod
    def get():
        response_dict_list = [n.to_dict() for n in Customer.query.all()]

        response = make_response(
            jsonify(response_dict_list),
            200,
        )
        return response

    @staticmethod
    def post():
        
        data = request.get_json()
        new_record = Customer(
            firstname=data['firstname'],
            lastname=data['lastname'],
            email=data['email'],
            password=data['password'],
            address=data['address'],
        )

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            jsonify(response_dict),
            201,
        )
        return response


api.add_resource(Customers, '/customers')

class CustomerByID(Resource):

    @staticmethod
    def get(id):
        response_dict = Customer.query.filter_by(id=id).first().to_dict()

        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response

    @staticmethod
    def patch(id):
        record = Customer.query.filter_by(id=id).first()
        for attr in request.get_json():
            setattr(record, attr, request.get_json()[attr])

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(
            jsonify(response_dict),
            200
        )
        return response

    @staticmethod
    def delete(id):
        record = Customer.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            jsonify(response_dict),
            200
        )
        return response

api.add_resource(CustomerByID, '/customers/<int:id>')

# CRUD for the Item Table

class Items(Resource):

    @staticmethod
    def get():
        response_dict_list = [item.to_dict() for item in Item.query.all()]

        response = make_response(
            jsonify(response_dict_list),
            200,
        )

        return response

    @staticmethod
    def post():
        new_record = Item(
            name=request.form['name'],
            description=request.form['description'],
            price=request.form['price'],
            category=request.form['category'],
            imageUrl=request.form['imageUrl'],
            rating=request.form['rating'],
            quantity=request.form['quantity'],
        )

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            jsonify(response_dict),
            201,
        )
        return response

api.add_resource(Items, '/items')

class ItemByID(Resource):

    @staticmethod
    def get(id):
        response_dict = Item.query.filter_by(id=id).first().to_dict()

        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response

    @staticmethod
    def patch(id):
        record = Item.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(
            jsonify(response_dict),
            200
        )
        return response

    @staticmethod
    def delete(id):
        record = Item.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            jsonify(response_dict),
            200
        )
        return response

api.add_resource(ItemByID, '/items/<int:id>')

# CRUD for Favorites

class FavoriteItems(Resource):

    @staticmethod
    def get():
        items = [item.to_dict() for item in Favorite.query.all()]

        response = make_response(
            jsonify(items),
            200
        )
        return response

    @staticmethod
    def post():
        favorites = Favorite(
            customer_id=request.get_json()['customer_id'],
            item_id=request.get_json()['item_id'],
        )

        db.session.add(favorites)
        db.session.commit()

        favorite_items = Favorite.query.all()

        response = make_response(
            jsonify([item.to_dict() for item in favorite_items]),
            201
        )
        return response

api.add_resource(FavoriteItems, "/favorites")

class FavoriteItemsID(Resource):

    @staticmethod
    def delete(id):
        item = Favorite.query.filter_by(id=id).first()

        db.session.delete(item)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            jsonify(response_dict),
            200
        )
        return response

api.add_resource(FavoriteItemsID, "/favorites/<int:id>")

# CRUD for the Order Table

class Orders(Resource):

    @staticmethod
    def get():
        response_dict_list = [n.to_dict() for n in Order.query.all()]

        response = make_response(
            jsonify(response_dict_list),
            200,
        )
        return response

    @staticmethod
    def post():

        order = request.get_json()

        new_record = Order(
            order_id=order['order_id'],
            customer_id=order['customer_id'],
            item_id=order['item_id'],
            price=order['price'],
            status=order['status'],
        )

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            jsonify(response_dict),
            201,
        )
        return response

api.add_resource(Orders, '/orders')

class OrderByID(Resource):

    @staticmethod
    def get(id):
        response_dict = Order.query.filter_by(id=id).first().to_dict()

        response = make_response(
            jsonify(response_dict),
            200,
        )

        return response

    @staticmethod
    def patch(id):
        record = Order.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(
            jsonify(response_dict),
            200
        )

        return response

    @staticmethod
    def delete(id):
        record = Order.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            jsonify(response_dict),
            200
        )
        return response


api.add_resource(OrderByID, '/orders/<int:id>')

# CRUD for the Payment Table

class Payments(Resource):

    def get(self):
        response_dict_list = [n.to_dict() for n in Payment.query.all()]

        response = make_response(
            jsonify(response_dict_list),
            200,
        )
        return response

    def post(self):
        new_record = Payment(
            paymentdate=request.form['paymentdate'],
            paymentmedhod=request.form['paymentmedhod'],
            amount=request.form['amount'],
        )

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            jsonify(response_dict),
            201,
        )
        return response

api.add_resource(Payments, '/payments')

class PaymentByID(Resource):

    @staticmethod
    def get(id):
        response_dict = Payment.query.filter_by(id=id).first().to_dict()

        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response

    def patch(self, id):
        record = Payment.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(
            jsonify(response_dict),
            200
        )

        return response

    def delete(self, id):
        record = Payment.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            jsonify(response_dict),
            200
        )
        return response


api.add_resource(PaymentByID, '/payments/<int:id>')

# CRUD for the Review Table

class Reviews(Resource):

    @staticmethod
    def get():

        response_dict_list = [review.to_dict() for review in Review.query.all()]

        response = make_response(
            jsonify(response_dict_list),
            200,
        )
        return response

    @staticmethod
    def post():
        new_record = Review(
            comment=request.get_json()['comment'],
            item_id=request.get_json()['item_id'],
            customer_id=request.get_json()['customer_id']
        )

        db.session.add(new_record)
        db.session.commit()

        response_dict = new_record.to_dict()

        response = make_response(
            jsonify(response_dict),
            201,
        )
        return response

api.add_resource(Reviews, '/reviews')

class ReviewByID(Resource):

    @staticmethod
    def get(id):
        response_dict = Review.query.filter_by(id=id).first().to_dict()

        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response

    @staticmethod
    def patch(id):
        record = Review.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(record, attr, request.form[attr])

        db.session.add(record)
        db.session.commit()

        response_dict = record.to_dict()

        response = make_response(
            jsonify(response_dict),
            200
        )
        return response

    @staticmethod
    def delete(id):
        record = Review.query.filter_by(id=id).first()

        db.session.delete(record)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            jsonify(response_dict),
            200
        )
        return response


api.add_resource(ReviewByID, '/reviews/<int:id>')


class ProductReviewByID(Resource):

    @staticmethod
    def get():
        item_id = request.get_json()['item_id']

        response_dict = Review.query.filter_by(customer_id=item_id).to_dict()
        response = make_response(
            jsonify(response_dict),
            200,
        )
        return response


api.add_resource(ProductReviewByID, '/reviews?<int:item_id>')

if __name__ == '__main__':
    app.run(port=5555)
