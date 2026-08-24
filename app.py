import streamlit as st
st.set_page_config(layout="centered")
st.markdown("""
<style>
.stApp{background:#e5e5e5}
.q{background:#0f2130;color:white;padding:14px 18px;border-radius:12px;font-weight:700;margin-bottom:14px}
.o{background:#0f2130;color:white;padding:12px 14px;border-radius:12px;margin-bottom:10px;width:100%;border:none;text-align:left}
.ok{background:#28a745!important}
.bad{background:#c0392b!important}
</style>
""", unsafe_allow_html=True)

if "done" not in st.session_state:
    st.session_state.done=False
    st.session_state.pick=None

st.markdown('<div class="q">This sign shows you that ..</div>', unsafe_allow_html=True)
c1,c2 = st.columns([1.6,1])

with c1:
    if not st.session_state.done:
        if st.button("A. you have to turn off to a weigh bridge.", use_container_width=True):
            st.session_state.done=True; st.session_state.pick="A"; st.rerun()
        if st.button("B. there is a roadway shop to your left.", use_container_width=True):
            st.session_state.done=True; st.session_state.pick="B"; st.rerun()
        if st.button("C. you have to turn left there if your brakes failed and you need to stop.", use_container_width=True):
            st.session_state.done=True; st.session_state.pick="C"; st.rerun()
    else:
        if st.session_state.pick=="A":
            st.markdown('<div class="o bad">A. you have to turn off to a weigh bridge. ❌</div>', unsafe_allow_html=True)
        else:
            st.markdown('<div class="o" style="opacity:0.6">A. you have to turn off to a weigh bridge.</div>', unsafe_allow_html=True)
        if st.session_state.pick=="B":
            st.markdown('<div class="o bad">B. there is a roadway shop to your left. ❌</div>', unsafe_allow_html=True)
        else:
            st.markdown('<div class="o" style="opacity:0.6">B. there is a roadway shop to your left.</div>', unsafe_allow_html=True)
        st.markdown('<div class="o ok">C. you have to turn left there if your brakes failed and you need to stop. ✅</div>', unsafe_allow_html=True)
        if st.button("Next →", type="primary", use_container_width=True):
            st.session_state.done=False; st.rerun()

with c2:
    st.image("sign.jpg", use_container_width=True)