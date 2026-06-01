from sqlalchemy import Column,Integer,String
from app.database import Base
from sqlalchemy.orm import relationship

class Customer(Base):

    __tablename__ = "customers"

    id = Column(Integer, primary_key=True)

    name = Column(String, nullable=False)

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    phone = Column(String)

orders = relationship(
    "Order",
    back_populates="customer"
)