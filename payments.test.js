describe('Payment tests (with tear-down)', function () {
    describe('on proper payment submission', function () {
        
        beforeEach(function () {
        billAmtInput.value = 20;
        tipAmtInput.value = 5;
        curPayment = createCurPayment();
        submitPaymentInfo();
        })

        it ('should increase paymentId on submitPaymentInfo()', function () {
            expect(paymentId).toEqual(1);
        })

        it ('should add curPayment to allPayments on submitPaymentInfo()', function () {
            expect(allPayments['payment1']).toEqual(curPayment);
        })

        it ('should create a payment object with positive bill amount and tip amount', function () {
            expect(curPayment.billAmt).toEqual('20');
            expect(curPayment.tipAmt).toEqual('5');
        })

        it ('should create table row element on appendPaymentTable()', function () {
            let curTdList = document.querySelectorAll('#payment1 td');

            expect(curTdList.length).toEqual(4);
            expect(curTdList[0].innerText).toEqual('$20');
            expect(curTdList[1].innerText).toEqual('$5');
            expect(curTdList[2].innerText).toEqual('25%');
            expect(curTdList[3].innerText).toEqual('X');
        })

        it ('should update table data on updateSummary()', function () {
            expect(summaryTds[0].innerHTML).toEqual('$20');
            expect(summaryTds[1].innerHTML).toEqual('$5');
            expect(summaryTds[2].innerHTML).toEqual('25%');

        }) 

        afterEach( function () {
            paymentTableTr = document.querySelector('#payment1');
            paymentTableTr.remove()
            summaryTds[0].innerHTML = '';
            summaryTds[1].innerHTML = '';
            summaryTds[2].innerHTML = '';
        })
    })

    it ('should create a payment object with positive bill and 0 tip', function () {
        billAmtInput.value = 20;
        tipAmtInput.value = 0;
        expect(createCurPayment().billAmt).toEqual('20');
        expect(createCurPayment().tipAmt).toEqual('0');
    })

    it ('should return undefined with negative bill and tip', function () {
        billAmtInput.value = -20;
        tipAmtInput.value = -5;
        expect(createCurPayment()).not.toBeDefined();
    })

    it ('should return undefined with positive bill and negative tip', function () {
        billAmtInput.value = 20;
        tipAmtInput.value = -5;
        expect(createCurPayment()).not.toBeDefined();
    })

    it ('should return undefined with 0 bill', function () {
        billAmtInput.value = 0;
        tipAmtInput.value = 5;
        expect(createCurPayment()).not.toBeDefined();
    })

    it ('should remove payment on removePayment() when only one exists', function () {
        allPayments = {payment1 : {billAmt : 20, tipAmt : 5, tipPercent : 25}};
        removePayment('payment1');
        expect(allPayments).toEqual({});
    })

    it ('should remove payment when more than one exists', function () {
        allPayments = {payment1 : {billAmt : 20, tipAmt : 5, tipPercent : 25},
                       payment2 : {billAmt : 100, tipAmt : 10, tipPercent : 10}}
        removePayment('payment1');
        expect(allPayments['payment1']).not.toBeDefined();
        expect(allPayments['payment2']).toEqual( {billAmt : 100, tipAmt : 10, tipPercent : 10});
    })

    afterEach( function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        allPayments = {};
        paymentId = 0;
    })
})