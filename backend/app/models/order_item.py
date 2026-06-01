from sqlalchemy import Column,Integer,Float,ForeignKey
from app.database import Base
from sqlalchemy.orm import relationship

class OrderItem(Base):

    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True)

    order_id = Column(
        Integer,
        ForeignKey("orders.id")
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id")
    )

    quantity = Column(Integer)

    unit_price = Column(Float)

product = relationship(
    "Product",
    back_populates="order_items"
)

order = relationship(
    "Order",
    back_populates="items"
)