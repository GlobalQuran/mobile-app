

export class test {

    public data = 'yes';

    constructor() { }

    demo(){
        return this.data;
    }
    change (newData, obj)
    {
        this.data = newData;
        obj.show = newData;
    }
}
