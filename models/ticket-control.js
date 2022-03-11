const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(num, desktop) {
        this.num = num;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        this.init();
    }

    get toJson() {

        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour,
        }
    }

    init() {

        const { last, today, tickets, lastFour} = require('../db/data.json');
        if (today === this.today) {
            this.tickets  = tickets;
            this.last     = last;
            this.lastFour = lastFour;
        }else {
            // Is Other day
            this.saveDB();
        }
    }

    saveDB(){

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify(this.toJson));

    }

    next() {
        this.last += 1;
        const ticket = new Ticket( this.last, null);
        this.tickets.push( ticket );

        this.saveDB();
        return 'Ticket ' + ticket.num;
    }

    attendTicket( desktop ){

        // Not have tickets
        if ( this.tickets.length === 0 ){
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.desktop = desktop;

        this.lastFour.unshift( ticket );

        if ( this.lastFour.length > 4 ){
            this.lastFour.slice(-1,1);
        }

        this.saveDB();
        return ticket;
    }
}

module.exports = TicketControl;