export default class Timer{
     constructor(root){
        root.innerHTML=Timer.getHTML();

        this.el = {
            seconds: root.querySelector(".timer_part"),
            pause: root.querySelector("#timer_btn"),
            reset: root.querySelector("#reset_btn"),
        };

        this.interval = null;

        function time(){
            var selectedTime=document.querySelector(`input[name="time"]:checked`);
            return selectedTime.value;
        }
        this.remainingSeconds=time();

        this.updateInterfaceTime();

        this.updateInterfaceControls();

        this.start();

        this.el.pause.addEventListener("click", ()=>{
            if(this.interval === null){
                this.start();
            }
            else{
                this.stop();
            }
        });
        this.el.pause.addEventListener("keypress", ()=>{
            if(this.interval === null){
                this.start();
            }
            else{
                this.stop();
            }
        });
        this.el.reset.addEventListener("click", ()=>{
            this.stop();
            this.remainingSeconds = time();
            this.updateInterfaceTime();
        });
     }

     updateInterfaceControls(){
        if(this.interval === null){
            this.el.pause.innerHTML = "Resume";
        }
        else{
            this.el.pause.innerHTML ="Pause";
        }
     }

     updateInterfaceTime(){
        const seconds = this.remainingSeconds;

        this.el.seconds.textContent = seconds;
     }

     start(){
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(()=>{
            this.remainingSeconds--;
            this.updateInterfaceTime();
            if(this.remainingSeconds === 0){
                this.stop();
                // alert("Time is over!")
            }
        }, 1000);
        this.updateInterfaceControls();

    }

    stop(){
        clearInterval(this.interval);
        this.interval= null;
        this.updateInterfaceControls();

    }

    static getHTML() {
        return `
            <div class="time_choose">

                <input type="radio" name="time" class="seconds_choose" value="20" checked>20
                <input type="radio" name="time" class="seconds_choose" value="30">30


            </div>
            <span class="timer_part">00</span>
            <div class="button">
                <button type="button" id="timer_btn">Pause</button>
            
                <button type="button" id="reset_btn">Reset</button>
            </div>
        `;
    }
}