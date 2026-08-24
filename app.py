import streamlit as st
st.set_page_config(layout="centered")
st.markdown("<style>.stApp{background:#e5e5e5}.q{background:#0f2130;color:white;padding:14px;border-radius:12px;font-weight:700;margin-bottom:12px}.o{background:#0f2130;color:white;padding:12px;border-radius:12px;margin-bottom:8px;width:100%;border:none;text-align:left}.ok{background:#28a745!important}.bad{background:#c0392b!important}</style>", unsafe_allow_html=True)
if "done" not in st.session_state: st.session_state.done=False; st.session_state.pick=None
st.markdown('<div class="q">This sign shows you that ..</div>', unsafe_allow_html=True)
c1,c2=st.columns([1.6,1])
with c1:
 if not st.session_state.done:
  if st.button("A. you have to turn off to a weigh bridge.",use_container_width=True): st.session_state.done=True; st.session_state.pick="A"; st.rerun()
  if st.button("B. there is a roadway shop to your left.",use_container_width=True): st.session_state.done=True; st.session_state.pick="B"; st.rerun()
  if st.button("C. you have to turn left there if your brakes failed and you need to stop.",use_container_width=True): st.session_state.done=True; st.session_state.pick="C"; st.rerun()
 else:
  st.markdown(f'<div class="o {"bad" if st.session_state.pick=="A" else ""}">A. you have to turn off to a weigh bridge. {"❌" if st.session_state.pick=="A" else ""}</div>',unsafe_allow_html=True)
  st.markdown(f'<div class="o {"bad" if st.session_state.pick=="B" else ""}">B. there is a roadway shop to your left. {"❌" if st.session_state.pick=="B" else ""}</div>',unsafe_allow_html=True)
  st.markdown('<div class="o ok">C. you have to turn left there if your brakes failed and you need to stop. ✅</div>',unsafe_allow_html=True)
  if st.button("Next →",type="primary",use_container_width=True): st.session_state.done=False; st.rerun()
with c2:
 st.markdown('<div style="background:white;border:3px solid #b00;border-radius:10px;overflow:hidden"><div style="display:grid;grid-template-columns:repeat(5,1fr)"><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div><div style="background:#d00;height:35px"></div><div style="background:white;height:35px"></div></div><div style="background:black;color:white;text-align:center;padding:8px;font-size:32px">⬅</div></div>',unsafe_allow_html=True)