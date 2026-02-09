import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def handle_user_message(user, message_text):
    """
    Process user chat message via LLM.
    """
    # VIOLATION 6: LLM PII Leakage
    # Injecting raw PII into the system prompt context
    system_prompt = f"""
    You are a helpful assistant.
    User Context:
    Name: {user.name}
    Email: {user.email}
    Account ID: {user.account_id}
    Address: {user.full_address}
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message_text}
        ],
        temperature=0.7
    )

    return response.choices[0].message.content