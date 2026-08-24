import streamlit as st

st.set_page_config(page_title="K53 tutor REAL", page_icon="🚗")
st.title("🚗 K53 tutor - From YOUR PDF")
st.caption("From AT_learners_license.pdf - 64 Q Format | Page 4 says Pass 22/28, 23/28, 6/8")

if "q" not in st.session_state:
    st.session_state.q=0
    st.session_state.score=0
    st.session_state.c=0
    st.session_state.s=0
    st.session_state.r=0

qs = [
 # CONTROLS 8 - Page 5-6 - Must get 6/8
 ("[Page 5] What is control No.1 in diagram?", ["Parking Brake","Rear-view Mirror","Clutch","Hooter"], "Rear-view Mirror", "CONTROLS"),
 ("[Page 5] Control to disengage engine for gear change?", ["Foot Brake","Clutch","Accelerator","Steering"], "Clutch", "CONTROLS"),
 ("[Page 5] Control to hold vehicle stationary?", ["Foot Brake","Gear Lever","Parking Brake","Accelerator"], "Parking Brake", "CONTROLS"),
 ("[Page 6] Motorcycle No.8 is?", ["Indicator","Handlebars - steer direction","Tachometer","Kick Starter"], "Handlebars - steer direction", "CONTROLS"),
 ("[Page 5] Sharp turn - need which controls? (TRICK)", ["Only steering","Mirrors(1,3)+Indicator(5)+Gear(6,8)+Steering(4)+Accel(10)","Only brakes","Only mirrors"], "Mirrors(1,3)+Indicator(5)+Gear(6,8)+Steering(4)+Accel(10)", "CONTROLS"),
 ("[Page 98] Main beam must see person at least?", ["45m","100m","30m","20m"], "100m", "CONTROLS"),
 ("[Page 98] Dipped beam must see at least?", ["100m","45m","150m","30m"], "45m", "CONTROLS"),
 ("[Page 98] Stop lamps visible in sunlight?", ["20m","30m","45m","100m"], "30m", "CONTROLS"),
 # SIGNS 28 - Page 7-44
 ("[Page 7] 🛑 STOP sign - what to do?", ["Slow","Stop completely in line with sign or before line","Yield","Hoot"], "Stop completely in line with sign or before line", "SIGNS"),
 ("[Page 8] Pedestrian area max unless sign says higher?", ["60","15km/h","30","100"], "15km/h", "SIGNS"),
 ("[Page 9] ⭕ No entry sign means?", ["One way","No vehicles may enter at any time","Stop","Parking"], "No vehicles may enter at any time", "SIGNS"),
 ("[Page 12] White disc red border =?", ["Command","Prohibition - what you may NOT do","Information","Guidance"], "Prohibition - what you may NOT do", "SIGNS"),
 ("[Page 14] Blue rectangle with BUS =?", ["No buses","Lane reserved for buses only","Bus stop ahead","Parking"], "Lane reserved for buses only", "SIGNS"),
 ("[Page 17] Residential area max?", ["60","30km/h","100","15"], "30km/h", "SIGNS"),
 ("[Page 17] Freeway hand signals?", ["Allowed","Not allowed except emergency","Always","Only night"], "Not allowed except emergency", "SIGNS"),
 ("[Page 18] Red cross over sign =?", ["Start","End of restriction - no longer applies","Danger","Stop"], "End of restriction - no longer applies", "SIGNS"),
 # RULES 28 - Page 92-99 - MOST ASKED
 ("[Page 96] Park from pedestrian crossing?", ["1m","6m","9m","5m"], "9m", "RULES"),
 ("[Page 96] Park from bridge?", ["9m","6m","5m","1m"], "6m", "RULES"),
 ("[Page 96] No stopping within 5m of?", ["Bridge","Intersection","Garage","Tree"], "Intersection", "RULES"),
 ("[Page 96] No park within 1m of hydrant?", ["Intersection","Fire hydrant/hose","Bridge","Crossing"], "Fire hydrant/hose", "RULES"),
 ("[Page 92] When fast / wet / loose surface - following distance?", ["Decrease","Increase distance","Same","Ignore"], "Increase distance", "RULES"),
 ("[Page 93] May overtake on LEFT when?", ["Never","Vehicle ahead turning right OR one-way road","Always","On blind rise"], "Vehicle ahead turning right OR one-way road", "RULES"),
 ("[Page 93] Don't overtake at?", ["Straight","Blind rise/curve where view limited","Parking","Bridge"], "Blind rise/curve where view limited", "RULES"),
 ("[Page 92] General urban speed limit?", ["100","60km/h","120","30"], "60km/h", "RULES"),
 ("[Page 99] NOT allowed on freeway?", ["Car","Pedestrian / 50cc / animal-drawn / tractor","Bus","Truck"], "Pedestrian / 50cc / animal-drawn / tractor", "RULES"),
]

i = st.session_state.q
if i < len(qs):
    txt, opts, ans, cat = qs[i]
    st.subheader(f"{cat} | Q {i+1}/{len(qs)}")
    st.write(f"### {txt}")
    choice = st.radio("Pick:", opts, key=f"q{i}")
    if st.button("Submit ✅"):
        if choice == ans:
            st.success("Correct! From YOUR PDF")
            st.session_state.score+=1
            if cat=="CONTROLS": st.session_state.c+=1
            elif cat=="SIGNS": st.session_state.s+=1
            else: st.session_state.r+=1
        else:
            st.error(f"Wrong. Answer: {ans}")
        st.session_state.q+=1
        st.rerun()
else:
    st.balloons()
    st.header(f"Done! {st.session_state.score}/{len(qs)}")
    st.write(f"CONTROLS: {st.session_state.c}/8 (Need 6) | SIGNS: {st.session_state.s} | RULES: {st.session_state.r}")
    if st.session_state.c>=6: st.success("You PASS Controls - Page 4 rule!")
    if st.button("Restart"):
        st.session_state.q=0; st.session_state.score=0; st.rerun()

st.sidebar.write("✅ Built 100% from your AT_learners_license.pdf")
st.sidebar.caption("Pages 5,7-18,92-99,96. No Google.")