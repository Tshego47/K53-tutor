import streamlit as st

st.set_page_config(page_title="K53 Real Test", page_icon="🚗", layout="wide")

# --- TEST CENTRE STYLE (Like your photo) ---
st.markdown("""
<style>
.stApp { background: #c8c8c8; }
.block { background: #1a1a2e; color: white; padding: 14px 18px; border-radius: 10px; margin-bottom: 10px; font-size: 17px; font-weight: 600; }
.opt { background: #1a1a2e; color: white; padding: 12px 16px; border-radius: 8px; margin-bottom: 10px; cursor: pointer; font-size: 15px; }
.opt-correct { background: #2ecc71; color: white; padding: 12px 16px; border-radius: 8px; margin-bottom: 10px; font-size: 15px; font-weight: 600; }
.sign-box { background: white; border: 3px solid #7a1a1a; border-radius: 12px; padding: 10px; text-align:center; }
</style>
""", unsafe_allow_html=True)

if "q" not in st.session_state:
    st.session_state.q = 0
    st.session_state.show = False
    st.session_state.score = 0

questions = [
    {
        "q": "This sign shows you that ...",
        "opts": ["A. you have to turn off to a weigh bridge.", "B. there is a roadway shop to your left.", "C. you have to turn left there if your brakes failed and you need to stop."],
        "ans": 2,
        "sign": "🟥⬜\n🟥⬜\n⬜🟥\n⬜🟥\n⬅️",
        "explain": "This is ARRESTER BED sign - for brake failure. Checkered red/white with arrow."
    },
    {
        "q": "What is Control No.1 in the light vehicle?",
        "opts": ["A. Parking brake", "B. Rear-view mirror", "C. Clutch pedal"],
        "ans": 1,
        "sign": "🪞",
        "explain": "Control 1 = Rear-view mirror - inside centre top."
    },
    {
        "q": "This sign shows you that the road ahead...",
        "opts": ["A. has a sharp bend to the left", "B. has a dual carriageway ahead", "C. is a one-way to the left"],
        "ans": 0,
        "sign": "↩️",
        "explain": "Bend warning sign."
    },
]

total = len(questions)
curr = questions[st.session_state.q] if st.session_state.q < total else None

if curr:
    st.markdown(f'<div class="block">{curr["q"]}</div>', unsafe_allow_html=True)
    
    col1, col2 = st.columns([2.2, 1])

    with col1:
        for idx, opt in enumerate(curr["opts"]):
            if st.session_state.show:
                if idx == curr["ans"]:
                    st.markdown(f'<div class="opt-correct">{opt} ✅</div>', unsafe_allow_html=True)
                else:
                    st.markdown(f'<div class="opt">{opt}</div>', unsafe_allow_html=True)
            else:
                if st.button(opt, key=f"{st.session_state.q}_{idx}", use_container_width=True):
                    st.session_state.show = True
                    if idx == curr["ans"]:
                        st.session_state.score += 1
                    st.rerun()

        if st.session_state.show:
            st.info(f"📖 {curr['explain']}")
            if st.button("Next →", type="primary", use_container_width=True):
                st.session_state.q += 1
                st.session_state.show = False
                st.rerun()

    with col2:
        st.markdown(f"""
        <div class="sign-box">
            <div style="font-size:48px; line-height:1.1;">
                <div style="display:grid; grid-template-columns:20px 20px; gap:2px; justify-content:center; margin:10px auto;">
                    <div style="width:20px; height:20px; background:#8B0000;"></div><div style="width:20px; height:20px; background:white; border:1px solid #ccc;"></div>
                    <div style="width:20px; height:20px; background:white; border:1px solid #ccc;"></div><div style="width:20px; height:20px; background:#8B0000;"></div>
                    <div style="width:20px; height:20px; background:#8B0000;"></div><div style="width:20px; height:20px; background:white; border:1px solid #ccc;"></div>
                    <div style="width:20px; height:20px; background:white; border:1px solid #ccc;"></div><div style="width:20px; height:20px; background:#8B0000;"></div>
                </div>
                <div style="font-size:50px;">⬅️</div>
            </div>
            <small>Road Sign</small>
        </div>
        """, unsafe_allow_html=True)

    st.progress((st.session_state.q)/total)
else:
    st.balloons()
    st.success(f"Done! Score: {st.session_state.score}/{total}")
    if st.button("Restart Test"):
        st.session_state.q=0
        st.session_state.score=0
        st.session_state.show=False
        st.rerun()