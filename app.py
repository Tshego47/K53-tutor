import streamlit as st

st.set_page_config(page_title="K53 Test - Exact Like Photo", layout="centered")

st.markdown("""
<style>
.stApp { background: #d9d9d9; }
.q { background: #0d1b2a; color: white; padding: 10px 14px; border-radius: 12px; font-weight: 700; font-size: 15px; margin-bottom: 12px; }
.o { background: #0d1b2a; color: white; padding: 9px 14px; border-radius: 10px; margin-bottom: 7px; font-size: 14px; }
.ok { background: #4dbd74; color: white; padding: 9px 14px; border-radius: 10px; margin-bottom: 7px; font-size: 14px; font-weight: 600; }
.sign { background: white; border: 3px solid #5a1e1e; border-radius: 10px; padding: 8px; }
</style>
""", unsafe_allow_html=True)

if "s" not in st.session_state:
    st.session_state.s=False

st.markdown('<div class="q">This sign shows you that ...</div>', unsafe_allow_html=True)

c1,c2 = st.columns([2,1])

with c1:
    if not st.session_state.s:
        if st.button("A. you have to turn off to a weigh bridge.", use_container_width=True):
            st.session_state.s=True
            st.session_state.a="A"
            st.rerun()
        if st.button("B. there is a roadway shop to your left.", use_container_width=True):
            st.session_state.s=True
            st.session_state.a="B"
            st.rerun()
        if st.button("C. you have to turn left there if your brakes failed and you need to stop.", use_container_width=True):
            st.session_state.s=True
            st.session_state.a="C"
            st.rerun()
    else:
        st.markdown('<div class="o">A. you have to turn off to a weigh bridge.</div>', unsafe_allow_html=True)
        st.markdown('<div class="o">B. there is a roadway shop to your left.</div>', unsafe_allow_html=True)
        st.markdown('<div class="ok">C. you have to turn left there if your brakes failed and you need to stop.</div>', unsafe_allow_html=True)
        st.success("✅ Correct! From YOUR PDF - Arrester Bed / Brake Failure sign - Page 23")
        if st.button("Next Sign →", type="primary", use_container_width=True):
            st.session_state.s=False
            st.rerun()

with c2:
    st.markdown('<div class="sign">', unsafe_allow_html=True)
    st.image("k53_arrester_bed_sign.webp", use_container_width=True)
    st.markdown('</div>', unsafe_allow_html=True)

st.caption("Source: AT_learners_license.pdf - Regulatory Signs")