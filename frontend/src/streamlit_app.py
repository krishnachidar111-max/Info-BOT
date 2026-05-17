import streamlit as st

st.set_page_config(page_title="SISTec Info Bot", page_icon="🤖")

st.title("SISTec Info Bot")
st.write("AI Assistant for SISTec Information")

question = st.text_input("Ask your question")

if question:
    st.write("Your question:", question)
