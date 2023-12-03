let dui = "06700421-9"

let res;

const _dui = dui.replace('-', "");
        let sum = 0, pos = 9;
        for (let i = 0; i < _dui.length - 1; i++) {
            sum = sum + (_dui[i] * pos);
            pos = pos - 1
            
        }

        sum = 10 - (sum % 10);

        if (sum == _dui[8] || sum == 0) {
            res = true;
        }else{
            res=  false;
        }

        console.log(res);