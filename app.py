import streamlit as st
st.set_page_config(layout="centered")
st.markdown("""
<style>.stApp{background:#d9d9d9}
.q{background:#0d1b2a;color:white;padding:12px 16px;border-radius:12px;font-weight:700;margin-bottom:12px}
.o{background:#0d1b2a;color:white;padding:10px 14px;border-radius:10px;margin-bottom:7px}
.ok{background:#4dbd74;color:white;padding:10px 14px;border-radius:10px;font-weight:700}
</style>
""", unsafe_allow_html=True)
if "s" not in st.session_state:
    st.session_state.s=False
st.markdown('<div class="q">This sign shows you that ..</div>', unsafe_allow_html=True)
c1,c2=st.columns([2,1])
with c1:
 if not st.session_state.s:
  if st.button("A. you have to turn off to a weigh bridge.", use_container_width=True):
   st.session_state.s=True; st.rerun()
  if st.button("B. there is a roadway shop to your left.", use_container_width=True):
   st.session_state.s=True; st.rerun()
  if st.button("C. you have to turn left there if your brakes failed and you need to stop.", use_container_width=True):
   st.session_state.s=True; st.rerun()
 else:
  st.markdown('<div class="o">C. you have to turn left there if your brakes failed and you need to stop. ✅</div>', unsafe_allow_html=True)
  if st.button("Next →", type="primary", use_container_width=True):
   st.session_state.s=False; st.rerun()
with c2:
 st.markdown('<div style="background:white;border:3px solid #5a1e1e;border-radius:10px;padding:10px;text-align:center"><div style="display:grid;grid-template-columns:30px 30px 30px;justify-content:center"><div style="background:#c1272d;height:30px"></div><div style="background:white;height:30px;border:1px solid #ccc"></div><div style="background:#c1272d;height:30px"></div><div style="background:white;height:30px"></div><div style="background:#c1272d;height:30px"></div><div style="background:white;height:30px"></div><div style="background:#c1272d;height:30px"></div><div style="background:white;height:30px"></div><div style="background:#c1272d;height:30px"></div></div><div style="background:#222;color:white;margin-top:8px;padding:6px;font-size:32px">⬅</div></div>', unsafe_allow_html=True)
