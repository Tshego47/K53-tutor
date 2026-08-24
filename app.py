import streamlit as st

st.set_page_config(page_title="K53 tutor", page_icon="🚗")
st.title("🚗 K53 tutor")
st.caption("Based on Official K53 Learners Manual | 64 Question Format")

if "q" not in st.session_state:
    st.session_state.q=0
    st.session_state.score=0
    st.session_state.c=0
    st.session_state.s=0
    st.session_state.r=0

qs = [
 ("What is Control No.1 in the light vehicle diagram?\n\n_Ref: K53 Manual - Vehicle Controls Layout_", ["Parking Brake","Rear-view Mirror","Clutch","Hooter"], "Rear-view Mirror", "VEHICLE CONTROLS"),
 ("Which control disengages the engine to allow gear changes?\n\n_Ref: K53 Manual - Clutch Function_", ["Foot Brake","Clutch","Accelerator","Steering"], "Clutch", "VEHICLE CONTROLS"),
 ("Which control is used to keep the vehicle stationary when parked?\n\n_Ref: K53 Manual - Parking Brake_", ["Foot Brake","Gear Lever","Parking Brake","Accelerator"], "Parking Brake", "VEHICLE CONTROLS"),
 ("On a motorcycle diagram, Control No.8 refers to?\n\n_Ref: K53 Manual - Motorcycle Controls_", ["Indicator","Handlebars - steering","Tachometer","Kick Starter"], "Handlebars - steering", "VEHICLE CONTROLS"),
 ("What controls are needed to make a sharp turn safely?\n\n_Ref: K53 Manual - Defensive Driving Procedure_", ["Only steering","Mirrors + Indicator + Gears + Steering + Accelerator","Only brakes","Only mirrors"], "Mirrors + Indicator + Gears + Steering + Accelerator", "VEHICLE CONTROLS"),
 ("Your main beam must allow you to see a person ahead from at least?\n\n_Ref: K53 Manual - Lights & Visibility_", ["45m","100m","30m","20m"], "100m", "VEHICLE CONTROLS"),
 ("Your dipped beam must allow you to see ahead at least?\n\n_Ref: K53 Manual - Lights & Visibility_", ["100m","45m","150m","30m"], "45m", "VEHICLE CONTROLS"),
 ("Stop lamps must be visible in sunlight from?\n\n_Ref: K53 Manual - Vehicle Lights_", ["20m","30m","45m","100m"], "30m", "VEHICLE CONTROLS"),
 ("What does a STOP sign require you to do?\n\n_Ref: K53 Manual - Regulatory Signs_", ["Slow","Stop completely in line with sign or before line","Yield","Hoot"], "Stop completely in line with sign or before line", "ROAD SIGNS"),
 ("Max speed in a pedestrian mall unless a sign shows higher?\n\n_Ref: K53 Manual - Speed Limits_", ["60","15km/h","30","100"], "15km/h", "ROAD SIGNS"),
 ("What does a NO ENTRY sign mean?\n\n_Ref: K53 Manual - Prohibition Signs_", ["One way","No vehicles may enter at any time","Stop","Parking"], "No vehicles may enter at any time", "ROAD SIGNS"),
 ("What does a white disc with red border indicate?\n\n_Ref: K53 Manual - Road Sign Classes_", ["Command","Prohibition - what you may NOT do","Information","Guidance"], "Prohibition - what you may NOT do", "ROAD SIGNS"),
 ("Blue rectangle with white BUS symbol means?\n\n_Ref: K53 Manual - Reserved Lanes_", ["No buses","Lane reserved for buses only","Bus stop ahead","Parking"], "Lane reserved for buses only", "ROAD SIGNS"),
 ("Speed limit in a residential area?\n\n_Ref: K53 Manual - Speed Limits_", ["60","30km/h","100","15"], "30km/h", "ROAD SIGNS"),
 ("Are hand signals allowed on a freeway?\n\n_Ref: K53 Manual - Freeway Rules_", ["Allowed","Not allowed except emergency","Always","Only night"], "Not allowed except emergency", "ROAD SIGNS"),
 ("A red cross over a road sign means?\n\n_Ref: K53 Manual - Road Signs_", ["Start","End of restriction - no longer applies","Danger","Stop"], "End of restriction - no longer applies", "ROAD SIGNS"),
 ("Within how many metres of a pedestrian crossing may you NOT park?\n\n_Ref: K53 Manual - Parking Rules - 9m Rule_", ["1m","6m","9m","5m"], "9m", "RULES OF ROAD"),
 ("Within how many metres of a bridge may you NOT park?\n\n_Ref: K53 Manual - Parking Rules_", ["9m","6m","5m","1m"], "6m", "RULES OF ROAD"),
 ("No stopping within 5m of?\n\n_Ref: K53 Manual - Stopping Restrictions_", ["Bridge","Intersection","Garage","Tree"], "Intersection", "RULES OF ROAD"),
 ("No parking within 1m of?\n\n_Ref: K53 Manual - Parking Restrictions_", ["Intersection","Fire hydrant/hose","Bridge","Crossing"], "Fire hydrant/hose", "RULES OF ROAD"),
 ("When road is wet, following distance should be?\n\n_Ref: K53 Manual - Following Distance_", ["Decrease","Increase distance","Same","Ignore"], "Increase distance", "RULES OF ROAD"),
 ("When may you overtake on the LEFT?\n\n_Ref: K53 Manual - Overtaking Rules_", ["Never","Vehicle ahead turning right OR on one-way road","Always","On blind rise"], "Vehicle ahead turning right OR on one-way road", "RULES OF ROAD"),
 ("Where must you NOT overtake?\n\n_Ref: K53 Manual - Overtaking Restrictions_", ["Straight","Blind rise/curve where view limited","Parking","Bridge"], "Blind rise/curve where view limited", "RULES OF ROAD"),
 ("General speed limit in urban area?\n\n_Ref: K53 Manual - Speed Limits_", ["100","60km/h","120","30"], "60km/h", "RULES OF ROAD"),
 ("Who is NOT allowed on a freeway?\n\n_Ref: K53 Manual - Freeway Rules_", ["Car","Pedestrian / 50cc / animal-drawn / tractor","Bus","Truck"], "Pedestrian / 50cc / animal-drawn / tractor", "RULES OF ROAD"),
]

i = st.session_state.q
if i < len(qs):
    txt, opts, ans, cat = qs[i]
    st.subheader(f"{cat} | Q {i+1}/{len(qs)}")
    st.markdown(f"### {txt}")
    choice = st.radio("Select answer:", opts, key=f"q{i}")
    if st.button("Submit ✅"):
        if choice == ans:
            st.success("✅ Correct!")
            st.session_state.score+=1
            if "CONTROLS" in cat: st.session_state.c+=1
            elif "SIGNS" in cat: st.session_state.s+=1
            else: st.session_state.r+=1
        else:
            st.error(f"❌ Incorrect. Correct answer: **{ans}**")
        st.session_state.q+=1
        st.rerun()
else:
    st.balloons()
    st.header(f"Result: {st.session_state.score}/{len(qs)}")
    c1,c2,c3 = st.columns(3)
    c1.metric("Controls", f"{st.session_state.c}/8")
    c2.metric("Signs", f"{st.session_state.s}/9")
    c3.metric("Rules", f"{st.session_state.r}/8")
    st.caption("Reference: All questions based on Official K53 Learners Manual")
    if st.button("Restart Test"):
        st.session_state.q=0; st.session_state.score=0; st.session_state.c=0; st.session_state.s=0; st.session_state.r=0; st.rerun()