from sqlalchemy import Column,Integer,Float,ForeignKey
from app.database import Base
from sqlalchemy.orm import relationship

class Order(Base):

    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id")
    )

    total_amount = Column(Float)

customer = relationship(
    "Customer",
    back_populates="orders"
)

items = relationship(
    "OrderItem",
    back_populates="order"
)