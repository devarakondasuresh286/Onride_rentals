# booking_service.py placeholder
from datetime import date


def has_booking_conflict(start_a: date, end_a: date, start_b: date, end_b: date) -> bool:
    return start_a <= end_b and start_b <= end_a


def calculate_total_price(days: int, daily_rate: float) -> float:
    return round(days * daily_rate, 2)
