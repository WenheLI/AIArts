class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 5 + Math.random() * 10;
        this.speedX = Math.random() * 5;
        this.speedY = Math.random() * 5;
        this.accX = Math.random() * .001;
        this.accY = Math.random() * .001;
    }

    update(plate) {
        const closestPoint = {};
        if (this.x < plate.x) closestPoint.x = plate.x;
        else if (this.x > plate.x + plate.width) closestPoint.x = plate.x + plate.w;
        else closestPoint.x = this.x;

        if (this.y < plate.y) closestPoint.y = plate.y;
        else if (this.y > plate.y + plate.height) closestPoint.y = plate.y + plate.height;
        else closestPoint.y = this.y;

        const distance = Math.sqrt(Math.pow(closestPoint.x - this.x, 2) + Math.pow(closestPoint.y - this.y, 2));
        if (distance < this.r) {
            this.speedX *= -1;
            this.speedY *= -1;
            this.x = closestPoint.x;
            this.y = closestPoint.y - this.r;
        }
        this.speedY += this.accY;
        this.speedX += this.accX;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x + this.r > 640) {
            this.x = 640 - this.r;
            this.speedX *= -1;
            this.accX *= -1;
        } else if (this.x - this.r < 0) {
            this.x = this.r;
            this.speedX *= -1;
            this.accX *= -1;
        } else if (this.y - this.r < 0) {
            this.y = this.r;
            this.speedY *= -1;
            this.accY *= -1;
        } else if (this.y + this.r > 480){
            this.y = 480 - this.r;
            this.speedY *= -1;
            this.accY *= -1;
        }
         
    }

    draw() {
        fill(255);
        ellipse(this.x, this.y, this.r, this.r);
    }
}