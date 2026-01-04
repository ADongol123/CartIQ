from passlib.context import CryptContext

pwd_content = CryptContext(schemes=['argon2'], deprecated='auto')


def hash_password(password: str) -> str:
    # truncate to 72 characters (bcrypt limit)
    truncated_password = password[:72]
    return pwd_content.hash(truncated_password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    truncated_password = plain_password[:72]
    return pwd_content.verify(truncated_password, hashed_password)
