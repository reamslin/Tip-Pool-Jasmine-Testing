describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should do nothing if server name input is empty on submitServerInfo()', function () {
    serverNameInput.value = '';
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  })

  it('should add a new table row element on updateServerTable()', function () {
    submitServerInfo();

    let curTdList = document.querySelectorAll('#serverTable tbody tr td'); 

    expect(curTdList.length).toEqual(3);
    expect(curTdList[0].innerText).toEqual('Alice');
    expect(curTdList[1].innerText).toEqual('$0.00');
  })

  it('should remove a server when it was the only one', function () {
    submitServerInfo();
    removeServer('server1');
    expect(allServers).toEqual({});
  })

  it('should remove a server when there are more than one', function () {
    submitServerInfo();
    serverNameInput.value = "Jon";
    submitServerInfo();
    removeServer('server1');
    expect(allServers['server2']).toEqual({serverName: 'Jon'});
    expect(Object.keys(allServers).length).toEqual(1);
  })

  afterEach(function() {
    // teardown logic
    serverId = 0;
    allServers = {};
    serverTbody.innerHTML = '';
  });
});
