class Plate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 20;
    }

    update(nose) {
        if (nose)
        this.x = 640 - nose.x;
    }

    move(direction) {
        switch (direction) {
            case 'Up':
                this.y -= 1;
                break;
            case 'Down':
                this.y += 1;
                break
            case 'Left':
                this.x -= 1;
                break
            case 'Right':
                this.x += 1;
                break
            default:
                break;
        }
        if (this.x >= 640) this.x = 640;
        else if (this.x <= 0) this.x = 0;
        else if (this.y >= 480) this.y = 480;
        else if (this.y <= 0) this.y = 0;
    }

    draw() {
        rect(this.x, this.y, this.width, this.height);
    }
}