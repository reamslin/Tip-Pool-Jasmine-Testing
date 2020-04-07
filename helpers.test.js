describe('helper functions tests', function () {
    describe('sumPaymentTotal tests', function () {
        it('should work with 0 payments', function () {
            expect(sumPaymentTotal('tipAmt')).toEqual(0);
            expect(sumPaymentTotal('billAmt')).toEqual(0);
            expect(sumPaymentTotal('tipPercent')).toEqual(0);
        })
        it ('should work with 1 payment', function () {
            allPayments = {payment1 : {billAmt : 20,
                                       tipAmt: 5,
                                       tipPercent: 25}};
            expect(sumPaymentTotal('tipAmt')).toEqual(5);
            expect(sumPaymentTotal('billAmt')).toEqual(20);
            expect(sumPaymentTotal('tipPercent')).toEqual(25);
        })
        
        it('should work with multiple payments', function (){
            allPayments = { payment1 : { billAmt : 20,
                                        tipAmt: 5,
                                        tipPercent: 25},
                            payment2 : { billAmt : 100,
                                        tipAmt : 10,
                                        tipPercent : 10}};
            expect(sumPaymentTotal('tipAmt')).toEqual(15);
            expect(sumPaymentTotal('billAmt')).toEqual(120);
            expect(sumPaymentTotal('tipPercent')).toEqual(35);
        })
        afterEach( function () {
            //tear down
            allPayments = {};
            paymentId = 0;
        })
    })

    describe('calculateTipPercent tests', function () {
        it ('should work with positive bill and positive tip', function () {
            expect(calculateTipPercent(20, 5)).toEqual(25);
        })

        it('should work with positive bill and zero tip', function () {
            expect(calculateTipPercent(20, 0)).toEqual(0);
        })
    })

    describe('appendTd tests', function () {
        it('should work with empty tr', function () {
            const tr = document.createElement('tr');
            const value = "test";
            appendTd(tr, value);

            expect(tr.innerHTML).toEqual('<td>test</td>');
        })

        it('should work with non-empty tr', function () {
            const tr = document.createElement('tr');
            tr.innerHTML = '<td>not empty</td>';
            const value = 'test';
            appendTd(tr,value);
            expect(tr.innerHTML).toEqual("<td>not empty</td><td>test</td>");
        })
    })

    describe('appendDeleteBtn tests', function () {
        it('should add delete td to given tr', function () {
            newTr = document.createElement('tr');
            appendDeleteBtn(newTr);
            expect(newTr.innerHTML).toEqual('<td>X</td>');
        })
    })
})