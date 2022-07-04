import cardLabel from './cardLabel.jpeg';
import leapCard from './leapCard.png';

function LeapCard() {
    return  <div id="leapCardBox">
    <div id="leapCardWholeCon">
        <div><div className="leapCard-Logo"><i className="fas fa-address-card"></i></div><div><h1>Leap Card</h1></div></div>
        <div className="leapCard-Balance">
            <div className="leapCard-ba-divTitle">
                <span className="leapCard-ba-spanTitle">Balance</span><br></br><br></br>
                <span style={{'font-size':'30px'}}>€28.82</span><br></br><br></br>
                <span style={{'font-size':'12px'}}>Available</span><br></br><br></br>
                
            </div>
            <br></br>
            <div className="leapCard-ba-divCon">
                <br></br>
                <div className="leapCard-ba-conLogo" ><i className="far fa-money-bill-alt"></i></div> 
                <p  className="leapCard-ba-conP"> This website does not support top-up at the moment, for top-up, please go to leapCard official website <a href="https://about.leapcard.ie/young-adult-and-student-card-launch?gclid=Cj0KCQjwhqaVBhCxARIsAHK1tiNHc7vYTSVwHtsajBidzgRy38Yg0uOQzzQJHdVEllLciUPGAUbG-rQaApJDEALw_wcB" >click here</a> </p>
            </div>
            
    
        </div>
        <div className="leapCard-AccInfo">
            <div className="leapCard-AccInfo-Title">
                    <div style={{'margin-top':'10px','margin-left': '15px'}}>
                        <span>Card Information</span><div className="leapCard-AccInfo-Logo" ><i className="fas fa-qrcode"></i></div><br></br><br></br>
                    </div>
            </div>
                    
                <div className="leapCard-AccInfo-Con">
                    <div style={{"margin-top":'5px',"margin-left": "30px"}}>
                        <br></br>
                        <div className="leapCard-AccInfo-ConDiv"><div style={{float:'left'}}><span className="fontTitle">Card label</span></div><div className="leapCard-AccInfo-fontValueDiv"><img style={{width: '100px'}} src={cardLabel} alt="cardlabel" /></div></div>
                        <div className="leapCard-AccInfo-ConDiv"><div style={{float:'left'}}><span className="fontTitle">Card number</span></div><div className="leapCard-AccInfo-fontValueDiv"><span >301268935</span></div></div>
                        <div className="leapCard-AccInfo-ConDiv"><div style={{float:'left'}}><span className="fontTitle">Card typy</span></div><div className="leapCard-AccInfo-fontValueDiv"><span>Personalised Student</span></div></div>
                        <div className="leapCard-AccInfo-ConDiv"><div style={{float:'left'}}><span className="fontTitle">Status</span></div><div className="leapCard-AccInfo-fontValueDiv"><span  >Unblocked</span></div></div>
                        <div className="leapCard-AccInfo-ConDiv"><div style={{float:'left'}}><span className="fontTitle">credit balance</span></div><div className="leapCard-AccInfo-fontValueDiv"><span > 22.46</span></div></div>
                        <div className="leapCard-AccInfo-ConDiv"><div style={{float:'left'}}><span className="fontTitle">Travel credit status </span></div><div className="leapCard-AccInfo-fontValueDiv"><span >Unblocked</span></div></div>
                        <div className="leapCard-AccInfo-ConDiv"><div style={{float:'left'}}><span className="fontTitle">Auto top-up</span></div><div className="leapCard-AccInfo-fontValueDiv"><span  >Disabled</span></div></div>
                        <div className="leapCard-AccInfo-ConDiv"><div style={{float:'left'}}><span className="fontTitle">Issue date</span></div><div className="leapCard-AccInfo-fontValueDiv"><span  >15/9/2021</span></div></div>
                        <div className="leapCard-AccInfo-ConDiv"><div style={{float:'left'}}><span className="fontTitle">Issue date</span></div><div className="leapCard-AccInfo-fontValueDiv"><span >Expiry date</span></div></div>
                    </div> 
                    <div className="leapCard-AccInfo-imag">
                        <img style={{width: '280px',height:'170px'}} src={leapCard} alt="leapcard"/>
                    </div>
                </div>
            
        </div>
        <div className="lpBal0"></div>
        <div className="leapCard-Trip">
            <div className="leapCard-Trip-Title">
                <br></br><span className="spanTitle" >Recent Activity</span><div className="leapCard-Trip-logo" ><i className="far fa-arrow-alt-circle-right"></i></div><br></br><br></br>
                
            </div>
                
            <div className="leapCard-Trip-Con">
                <div><div style={{float:'left',}}><span>14 Jun </span>&nbsp;<span>21:37</span>&nbsp;<span>Leap Top-Up App</span></div><div className="lpTripValue"><span style={{color:'green'}}>+€10.00</span></div></div>
                <div>---------------------------------------------------------------</div>
                <div style={{'margin-top':'15px'}}><div style={{float:'left',}}><span>12 Jun </span>&nbsp;<span>21:43</span>&nbsp;<span>Go-Ahead Ireland</span></div><div className="lpTripValue"><span >-€1.00</span></div></div>
                <div>---------------------------------------------------------------</div>
                <div style={{'margin-top':'15px'}}><div style={{float:'left',}}><span>09 Jun </span>&nbsp;<span>15:38</span>&nbsp;<span>Go-Ahead Ireland</span></div><div className="lpTripValue"><span style={{color:'green'}}>+€0.00</span></div></div>
                <div>---------------------------------------------------------------</div>
                <div style={{'margin-top':'15px'}}><div style={{float:'left',}}><span>09 Jun </span>&nbsp;<span>14:56</span>&nbsp;<span>Go-Ahead Ireland</span></div><div className="lpTripValue"><span >-€1.00</span></div></div>
                <div>---------------------------------------------------------------</div>
                <div style={{'margin-top':'15px'}}><div style={{float:'left',}}><span>05 Jun </span>&nbsp;<span>21:40</span>&nbsp;<span>Go-Ahead Ireland</span></div><div className="lpTripValue"><span >-€1.00</span></div></div>
            </div>    
        </div> 
    </div>
</div>;}

export default LeapCard;