var myHeaders = new Headers();
myHeaders.set("Access-Control-Allow-Origin", "*");
myHeaders.set("Access-Control-Request-Headers", "*");



function createAccountOnHover() {
  document.getElementById("roofToFill").beginElement()
  document.getElementById("toCreateAccountFoundation").beginElement();
  document.getElementById("toCreateAccountCol1").beginElement();
  document.getElementById("toCreateAccountCol2").beginElement();
  document.getElementById("toCreateAccountCol3").beginElement();
  document.getElementById("toCreateAccountCol4").beginElement();
  document.getElementById("toCreateAccountFloor").beginElement();
  document.getElementById("toCreateAccountCeiling").beginElement();
  document.getElementById("toCreateAccountRoof").beginElement();
  
}

function loginOnHover() {
  document.getElementById("roofToFill").beginElement()
  document.getElementById("toLoginFoundation").beginElement();
  document.getElementById("toLoginCol1").beginElement();
  document.getElementById("toLoginCol2").beginElement();
  document.getElementById("toLoginCol3").beginElement();
  document.getElementById("toLoginCol4").beginElement();
  document.getElementById("toLoginFloor").beginElement();
  document.getElementById("toLoginCeiling").beginElement();
  document.getElementById("toLoginRoof").beginElement();
  
  
}



function withdrawOnHover() {
  document.getElementById("roofToClear").beginElement()
  document.getElementById("toWithdrawFoundation").beginElement();
  document.getElementById("toWithdrawCol1").beginElement();
  document.getElementById("toWithdrawCol2").beginElement();
  document.getElementById("toWithdrawCol3").beginElement();
  document.getElementById("toWithdrawCol4").beginElement();
  document.getElementById("toWithdrawFloor").beginElement();
  document.getElementById("toWithdrawCeiling").beginElement();
  document.getElementById("toWithdrawRoof").beginElement();
  
}

function depositOnHover() {

  document.getElementById("roofToClear").beginElement()
  document.getElementById("toDepositFoundation").beginElement();
  document.getElementById("toDepositCol1").beginElement();
  document.getElementById("toDepositCol2").beginElement();
  document.getElementById("toDepositCol3").beginElement();
  document.getElementById("toDepositCol4").beginElement();
  document.getElementById("toDepositFloor").beginElement();
  document.getElementById("toDepositCeiling").beginElement();
  document.getElementById("toDepositRoof").beginElement();
  
  
}


function returnToCurrent(e) {
  if(currentSymbol=="login" && e.target.id!="loginLink") loginOnHover();
  if(currentSymbol=="balance" && e.target.id!="balanceLink") balanceOnHover();
  if(currentSymbol=="withdraw" && e.target.id!="withdrawLink") withdrawOnHover();
  if(currentSymbol=="createAccount"  && e.target.id!="createAccountLink") createAccountOnHover();
  if(currentSymbol=="bank" && e.target.id!="homeLink") homeOnHover();

}


const bank = {
  column1: "M -9.31 6.728 c 0.05 -8.034 0.076 -11.694 0.06 -12.761 c -0.935 0 -1.87 0 -2.805 0 c 0 4.254 0 8.51 0 12.782 c 0.473 -0.006 0.991 0 1.281 0 c 0.421 0 0.78 0 1.464 0",
  column2: "M -5.078 -6 c 0 4.254 0 8.51 0 12.762 c 0.9427 0 1.8853 0 2.828 0 c 0 -4.254 0 -8.51 0 -12.762 c -0.9427 0 -1.8853 0 -2.828 0",
  column3: " M 2 -6 c 0 4.254 0 8.51 0 12.762 c 0.9427 0 1.8853 0 2.828 0 c 0 -4.254 0 -8.51 0 -12.762 c -0.9427 0 -1.8853 0 -2.828 0",
  column4: " M 9 -6 c 0 4.254 0 8.51 0 12.762 c 0.9427 0 1.8853 0 2.828 0 c 0 -4.254 0 -8.51 0 -12.762 c -0.9427 0 -1.8853 0 -2.828 0",
  ceiling: "M-12 -6 c 3.438 0 6.817 0 12.07 0 c 4 0 7.834 0 11.832 0 c 1.396 0.048 1.339 -1.54 -0.067 -1.464 c -8.084 -0.0193 -7.15 -0.05 -11.806 -0.07 c -5.768 0 -8.92 0 -12.505 0 c -1.276 0 -1.166 1.652 0.367 1.544",
  floor:"M -12.503 9.477 c 8.395 0 11.06 0 12.5 0 c 8.61 0 4.329 0 12.889 0 c 1.845 0 1.782 -2.792 0 -2.78 c -4.585 0 -16.377 0 -25.363 0 c -1.841 -0 -2.031 2.683 0 2.742",
  foundation:"M -13.478 10.407 c -2.161 -0.266 -2.199 3.07 0 2.687 c 8.695 0 18.225 0 26.587 0 c 2.665 -0.116 2.394 -2.74 0 -2.742 c -3.697 0 -8.394 0 -13.091 0 c -4.7693 0 -9.5387 0 -13.478 -0.03",
  roof: "M 13.3 -10.996 c -4.227 -2.315 -8.542 -4.548 -13.27 -6.98 c 0 0 0 0 0 0 c -6.1 3.055 -10.414 5.212 -13.873 7 c 0 0 0 0 0 0 a 1 1 0 0 0 0.494 2.696 c 8.976 0 17.952 0 26.928 0 a 1 1 0 0 0 0.474 -2.359 c -0.25 -0.12 -0.5 -0.2353 -0.75 -0.353"


}


//withdraw symbol
const withdraw = {
  column1: "M -0.2 1.3567 c 0.771 3.0853 3.987 1.3943 3.6168 0.317 c -0.21 0 -0.42 0 -0.63 0 c 0 1 -1.7178 1.3833 -2.258 0.11 c 0 0 0 -0.193 0 -0.29 c -0.23 0 -0.46 0 -0.69 0",
  column2: "M 0.2 -0.7 c 0.8538 0.9835 2.7222 0.9497 2.613 2.289 c 0.181 0.084 0.431 0.131 0.652 0 c -0.0272 -2 -2.7132 -1.9897 -2.9482 -2.8035 c -0.1658 0 -0.8558 -0.466 -0.3466 0.47",
  column4: "M 3.4215 -2.0527 c -0.9385 -2.3883 -4.2975 -0.9183 -3.4185 0.8862 c 0.1658 0 0.3315 0 0.4973 0 c -0.2945 -1.8502 2.2868 -1.7848 2.475 -0.65 c 0.1537 0 0.5927 0 0.4417 -0.23",
  column3: "M 1.4513 -3.9255 c 0 2.5747 0 5.1493 0 7.724 c 0 0 0.1837 0 0.2755 0 c 0 -2.5744 0 -5.1489 0 -7.7233 c 0 0 -0.1841 0 -0.2762 -0",
  foundation:"M -14.454 0.228 c -0.4 0 -0.4123 0.5756 0 0.5038 c 1.6303 0 3.4172 0 5 0 c 0.4997 0 0.4489 -0.5138 0 -0.5141 c -0.6932 0 -1.5739 0 -2.4546 0 c -0.8942 0 -1.7885 0 -2.4384 0.0114",
  floor:"M -15.3156 -0.3426 c 1.5741 0 2.0737 0 2.3438 0 c 1.6144 0 0.8117 0 2.4167 0 c 0.3459 -0.0122 0.3341 -0.5235 0 -0.5212 c -0.8597 0 -3.0707 0 -4.7556 0.0071 c -0.3452 0 -0.3808 0.5031 -0.0292 0.5121",
  roof:"M 12 4.492 c 0.3475 0.126 0.595 -0.196 0.496 -0.4435 c 0 -2.8643 0.0163 -5.7287 0 -8.593 c 0 -0.1225 0 -0.4465 -0.531 -0.438 c -6.5 -0 -13 0 -19.5025 0 a 0.5 0.5 90 0 0 -0.52 0.4955 c 0 2.8395 0 5.679 0 8.5185 a 0.5 0.5 90 0 0 0.4705 0.5 c 6.5125 0 13 0 19.5375 -0",
  ceiling: "M 1.775 -4.922 c -6.365 0 -6.381 9.345 0.119 9.314 c 6.531 0 6.516 -9.377 -0.119 -9.314 c 0 0 0 0 0 0.7813 c 5.721 0 5.661 7.7417 0.104 7.7717 c -5.495 0.031 -5.541 -7.764 -0.106 -7.779 c 0 -0.774 0 -0.774 0 -0.774",
  borderRight: "M -7.3875 3.933 c 0.3375 0.098 17.345 0.223 19.1125 0 c -0.1212 -5.606 -0.0525 -7.359 -0.03 -8.509 c 0 0.347 -0.57 0.201 -0.89 0.328 c 0 3.939 0 -0.215 0.1946 7.8383 c -8.9654 0 -18.2946 -0.2173 -18.4534 -0.2553",
  borderLeft: "M -6.8149 -4.0052 c 15.3613 -0.2978 18.7163 0.6702 18.5788 -0.4618 c -4.5412 0 -14.3788 0 -19.2425 0 c 0 0.0497 0 2.751 0 8.271 c 0.3326 0 0.3926 0 0.6637 0 c 0 -0.295 0 -8 0 -7.7912"
}



//create account symbol: Windows user logo with plus sign
const createAccount = {
  ceiling:"M 0 -6 c -2.72 0 -2.72 4 0 4 c 2.72 0 2.72 -4 0 -4 c 0 -0.657 0 -1.184 0 -2 c 5 0 5 7.992 0 8 c -5 0 -5 -7.975 0 -8 c 0 0.418 0 1.507 0 2", //head
  column1:"M -6 -1.708 c -5.673 -0.014 -6.174 -0.014 -7 -0.014 c 0 0.415 0 1.355 0 2 c 1.393 0 2.6 0 5 0 c 0.6633 0 1.3337 0 2 0 c 0 -0.757 0 -1.46 0 -1.986", 
  column2: "M -5 -1.724 c -1.104 0.012 -1.966 0.018 -2.997 0.011 c 0 0.722 0 1.306 0 2 c 0.928 0 2.3 0 3 0 c 0 -0.69 0 -1.386 0 -2.001",
  roof: "M -8.077 0.278 c 0 -0.57 0 -1 0 -2 c -0.602 0 -1.204 0 -1.806 -0 c -0.158 0 -0.171 0 -0.144 0.124 c 0 0 0 0 0 0 a 1 1 0 0 0 0 0.117 c 0 0.534 0 1 0 1.6 a 1 1 0 0 0 0 0.107 c 0.62 0 1.246 0 1.87 0",
  column3: "M -10 -4.712 c 0 1.162 0 1.958 0 3.034 c 0.538 0 1.463 0 1.958 0 c 0 -1.141 0 -2 0 -2.991 c -0.323 0 -1.27 0 -1.98 0",     //top of plus
  foundation:"M -10 3.276 c 1.498 0 .6 0 1.923 0 c 0 -0.867 0 -1.302 0 -1.959 c 0 -0.31 0 -0.55 0 -1.05 c -0.501 0 -1.789 0 -1.979 0 c 0 0.979 0 2 0 3",
  column4:"M -6.016 5.985 c 2.197 -2.303 8.753 -2.906 11.978 0 c 0.425 -0.071 1.418 0 2 0 c 0.05 -4.98 -15.416 -5.616 -15.941 0 c 0.663 0 1.353 0 1.933 0",
  floor:"M -8.024 7.984 c 7.461 0 11.572 0 16.01 0 c 0 -0.916 0 -0.916 0 -0.916 c 0 -0.345 0 -0.656 0 -1.071 c -4.197 0 -9 0 -16 0 c 0 0.587 0 1.33 0 1.969",
}

//deposit symbol: safe with dial/lock
const deposit = {

  ceiling:"M 0 -1.5 c -2 0 -2 3 0 3 c 2 0 2 -3 0 -3 c 0 -.5 0 -0.888 0 -1.5 c 3.7643 0 3.747 6 0 6 c -3.7403 0 -3.7755 -6 0 -6 c 0 0.31 0 1.13 0 1.5 ",
  column1:"M -2 -0.35 c -1.673 0 -3.346 0 -4 0 c 0 0.163 0 0.4 0 0.75 c 3.4 0 4.606 0 3 0 c 0.67 0 1.3407 0 1 0 c 0 -0.266 0 -0.475 0 -0.746 ",
  column2:"M 6 -0.35 c -3.3987 0 -4.396 0 -4.19 0 c 0 0.664 0 1.328 0 0.75 c 1.73 0 3.46 0 4.19 0 c 0 -0.6563 0 -0.268 0 -0.75 ",
  column3:"M -0.35 2 c 0 1.108 0 1.985 0 4.19 c 0.175 0 0.5 0 0.75 0 c 0 -2.681 0 -1.94 0 -4.19 c -0.6697 0 -1.3393 0 -0.75 0 ",
  column4:"M -0.35 -6.194 c 0 1.305 0 2.899 0 4.132 c 0.419 0 0.778 0 0.75 0 c 0 -0.928 0 -2.734 0 -4.132 c -0.25 0.019 -0.557 0 -0.825 0",
  foundation:"M 6 10 c 0.846 0 1.509 0 2 0 c 0 -0.727 0 -1.548 0 -2 c -0.916 0 -1.2 0 -1.358 0 c -0.221 0 -0.411 0 -0.593 0 c 0 0.6667 0 1.33 0 2",
  floor:"M -8 10 c 0.868 0 1.139 0 2 0 c 0 -0.516 0 -0.954 0 -1.298 c 0 -0.31 0 -0.469 0 -0.71 c -0.678 0 -1.216 0 -2.007 0 c 0 0.915 0 1.607 0 1.994",
  roof:"M 9 8 c 0.634 0.247 1.028 -0.781 0.987 -0.863 c 0 -5 0 -10.1933 0 -15.29 c 0.164 0 0 -0.863 -0.863 -0.986 c -6.2953 0 -12.5907 0.104 -18.886 0.156 a 0.5 0.5 90 0 0 -0.237 0.435 c 0 5.3107 0 10.6213 0 15.932 a 0.5 0.5 90 0 0 0.435 0.673 c 6.198 0 12.396 0 18.594 0 ",

}

//login symbol: Google's login symbol

const login = {
  roof: "M 3.83 0.028 c 0.011 -0.014 0.026 -0.033 0 -0.062 c -1.0507 -0.308 -2.2713 -0.65 -3.492 -0.966 c -0.158 0 -0.171 0 -0.144 0.124 c 0 0 0 0 0 0 a 1 1 0 0 0 0 0.117 c 0 0.534 0 1 0 1.602 a 1 1 0 0 0 0 0.107 c 1.235 -0.31 2.47 -0.62 3.636 -0.922",

  column1: "M -5 -0.992 c -1.67 0 -3.35 0 -5 0 c 0 0.664 0 1.325 0 1.986 c 3.4 0 4.606 0 3 0 c 0.6703 0 1.3407 0 2 0 c 0 -0.757 0 -1.46 0 -1.986",
  column2: "M 0.196 -1 c -3.3987 0 -4.396 0 -5.196 0 c 0 0.664 0 1.33 0 1.992 c 1.73 0 3.46 0 5.19 0 c 0 -0.6563 0 -1.3127 0 -1.969",
  column4: "M 8 -7 c 0 4.6743 0 9.35 0 14.023 c 0.6707 0 1.3413 0 2.012 0 c 0 -4.6783 0 -9.3567 0 -14.035 c -0.6697 0 -1.3393 0 -2.009 0",
  floor:"M 0 9 c 2.6667 0 5.33 0 8 0 c 1.1 0 2 -0.9 2 -1.997 c -0.6747 0 -1.3493 0 -2 0 c -2.6667 0 -5.33 0 -8 0 c 0 0.67 0 1.33 0 2",
  ceiling:"M 0 -7 c 1.33 0 2.6667 0 4 0 c 2 0 4 0 6 0 c 0 -1.1 -0.907 -2 -2.007 -2 c -1.331 0 -2.662 0 -3.993 0 c -1.3333 0 -2.6667 0 -4 0 c 0 1.234 -0.029 1.64 0 2",
  
  foundation:"M -2.4 3.6 c 0.4667 0.4667 0.93 0.93 1.4 1.4 c 1.6653 -1.6693 3.3307 -3.3387 2.245 -2.255 c 0.9183 -0.9153 1.8367 -1.8307 2.755 -2.745 c -0.88 0.223 -2.5307 0.6487 -3.796 0.976 c -0.878 0.878 -1.736 1.7513 -2.6 2.624",
  column3: "M -2.4 -3.6 c 0.8667 0.8667 1.73 1.73 2.6 2.6 c 1.2667 0.33 2.5333 0.6627 3.8 1 c -1.6693 -1.67 -3.3387 -3.33 -5 -4.998 c -0.464 0.468 -0.928 0.936 -1.392 1.404"
}


// https://yqnn.github.io/svg-path-editor/

var currentSymbol = "bank";
const pageSymbols = {"bank":bank, "withdraw":withdraw, "login":login, "createAccount":createAccount}
function SymbolDecomp() {
  var currentPage="bank"
  var bankDemo = document.getElementById("bankDemo");
  bankDemo.insertAdjacentHTML("beforeend",
       ` <path id="roof"    d='${bank.roof}' fill="rgba(0,0,0,1.0)" stroke="black" stroke-linejoin="round" stroke-width=".5px">
            <animate id="toHomeRoof" attributeName="d" begin="indefinite" dur=".5s" repeatCount=".5px" to='${bank.roof}' fill="freeze"/>
            <animate id="toCreateAccountRoof" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${createAccount.roof}'fill="freeze" />
            <animate id="toLoginRoof" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${login.roof}'' fill="freeze" />
            
            <animate id="toWithdrawRoof" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${withdraw.roof}' fill="freeze" />
            <animate id="toDepositRoof" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${deposit.roof}' fill="freeze" />
            <animate id="roofToFill" fill="freeze" begin="indefinite" attributeName="fill" dur=".5s" to="rgba(0,0,0,1.0)" />
            <animate id="roofToClear" fill="freeze" begin="indefinite" attributeName="fill" dur=".5s" to="rgba(0,0,0,0)" />
        </path>`
  );
  bankDemo.insertAdjacentHTML("beforeend",
        `<path id="foundation"   d='${bank.foundation}'  fill="rgba(0,0,0,1.0)" stroke="black" stroke-linejoin="round"  stroke-width=".5px">
            <animate id="toHomeFoundation" attributeName="d" begin="indefinite" dur=".5s" repeatCount=".5px" to='${bank.foundation}' fill="freeze"/>
            <animate id="toCreateAccountFoundation" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${createAccount.foundation}'fill="freeze" />
            <animate id="toLoginFoundation" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${login.foundation}' fill="freeze" />

            <animate id="toWithdrawFoundation" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${withdraw.foundation}' fill="freeze" />
            <animate id="toDepositFoundation" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${deposit.foundation}' fill="freeze" />
        </path>`
  );
  bankDemo.insertAdjacentHTML("beforeend",
        `<path id="column1"  d='${bank.column1}'  fill="rgba(0,0,0,1.0)" stroke="black"  stroke-width=".5px"> 
            <animate id="toHomeCol1" attributeName="d" begin="indefinite" dur=".5s" repeatCount=".5px" to='${bank.column1}'fill="freeze"/>
            <animate id="toCreateAccountCol1" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${createAccount.column1}'fill="freeze" />
            <animate id="toLoginCol1" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${login.column1}'fill="freeze" />

            <animate id="toWithdrawCol1" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${withdraw.column1} 'fill="freeze" />
            <animate id="toDepositCol1" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${deposit.column1}' fill="freeze" />
           
        </path>`
  );
  bankDemo.insertAdjacentHTML("beforeend",
        `<path id="column2" d='${bank.column2}'  fill="rgba(0,0,0,1.0)" stroke="black" stroke-linejoin="round" stroke-width=".5px" > 
            <animate id="toHomeCol2" attributeName="d" begin="indefinite" dur=".5s" repeatCount=".5px" to='${bank.column2}'fill="freeze"/>
            <animate id="toCreateAccountCol2" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${createAccount.column2}'fill="freeze" />
            <animate id="toLoginCol2" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${login.column2}'fill="freeze" />

            <animate id="toWithdrawCol2" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${withdraw.column2}' fill="freeze" />
            <animate id="toDepositCol2" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${deposit.column2}' fill="freeze" />
          
        </path>`
  );
  bankDemo.insertAdjacentHTML("beforeend",
        `<path id="column3" d='${bank.column3}' fill="rgba(0,0,0,1.0)" stroke="black" stroke-linejoin="round" stroke-width=".5px" > 
            <animate id="toHomeCol3" attributeName="d" begin="indefinite" dur=".5s" repeatCount=".5px" to='${bank.column3}'fill="freeze"/>
            <animate id="toCreateAccountCol3" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${createAccount.column3}'fill="freeze" />
            <animate id="toLoginCol3" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${login.column3}'fill="freeze" />

            <animate id="toWithdrawCol3" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${withdraw.column3}' fill="freeze" />
            <animate id="toDepositCol3" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${deposit.column3}' fill="freeze" />
        </path>`
  );
  bankDemo.insertAdjacentHTML("beforeend",
        `<path id="column4"  d='${bank.column4}'  fill="rgba(0,0,0,1.0)" stroke="black" stroke-linejoin="round" stroke-width=".5px"> 
            <animate id="toHomeCol4" attributeName="d" begin="indefinite" dur=".5s" repeatCount=".5px" to='${bank.column4}'fill="freeze"/>
            <animate id="toCreateAccountCol4" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${createAccount.column4}'fill="freeze" />
            <animate id="toLoginCol4" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${login.column4}'fill="freeze" />

            <animate id="toWithdrawCol4" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${withdraw.column4}' fill="freeze" />
            <animate id="toDepositCol4" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${deposit.column4}' fill="freeze" />
        </path>`
  );
  bankDemo.insertAdjacentHTML("beforeend",
        `<path id="floor"  d='${bank.floor}' fill="rgba(0,0,0,1.0)" stroke="black" stroke-linejoin="round" stroke-width=".5px"> 
            <animate id="toHomeFloor" attributeName="d" begin="indefinite" dur=".5s" repeatCount=".5px" to='${bank.floor}'fill="freeze"/>
            <animate id="toCreateAccountFloor" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${createAccount.floor}'fill="freeze" />
            <animate id="toLoginFloor" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${login.floor}'fill="freeze" />
          
            <animate id="toWithdrawFloor" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${withdraw.floor}' fill="freeze" />
            <animate id="toDepositFloor" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${deposit.floor}' fill="freeze" />
        </path>`
  );
  bankDemo.insertAdjacentHTML("beforeend",
        `<path id="ceiling" d='${bank.ceiling}'  fill="rgba(0,0,0,1.0)" stroke="black" stroke-linejoin="round" stroke-width=".5px">
            <animate id="toHomeCeiling" attributeName="d" begin="indefinite" dur=".5s" repeatCount=".5px" to='${bank.ceiling}'fill="freeze"/>
            <animate id="toCreateAccountCeiling" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${createAccount.ceiling}'fill="freeze" />
            <animate id="toLoginCeiling" attributeName="d"  begin="indefinite"  dur=".5s" repeatCount=".5px" to='${login.ceiling}'fill="freeze" />

            <animate id="toWithdrawCeiling" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${withdraw.ceiling}' fill="freeze" />
            <animate id="toDepositCeiling" attributeName="d" begin="indefinite"  dur=".5s" repeatCount=".5px" to='${deposit.ceiling}' fill="freeze" />
        </path>`
  );
  



  
}



