$(function () {


    /***** 树菜单 ****/

    var menu = {
        "name": "",
        "level": "0",
        "haschildren": true,
        "url": "tcstate_ns.html",
        "isopen": false,
        "children": [
           {
            "name": "A集团公司",
            "level": "1",
            "haschildren": true,
            "url": "tcstate_ns.html",
            "isopen": true,
            "children": [
                {
                "name": "客厅主机(vz4659894646)",
                "level": "2",
                "haschildren": true,
                "url": "tcstate_ns.html",
                "isopen": false,
                "children": [
                    {
                    "name": "客厅主机某某1",
                    "level": "3",
                    "haschildren": false,
                    "url": "tcstate_ns.html",
                    "isopen": false,
                    "children": ""
                    }, 
                    {
                        "name": "客厅主机某某2",
                        "level": "3",
                        "haschildren": false,
                        "url": "tcstate_ns.html",
                        "isopen": false,
                        "children": ""
                    }
                ]
              },
              {
                "name": "客厅主机2(vz4659894646)",
                "level": "2",
                "haschildren": true,
                "url": "tcstate_ns.html",
                "isopen": false,
                "children": [
                    {
                    "name": "客厅主机2某某1",
                    "level": "3",
                    "haschildren": false,
                    "url": "tcstate_ns.html",
                    "isopen": false,
                    "children": ""
                    }, 
                    {
                        "name": "客厅主机2某某2",
                        "level": "3",
                        "haschildren": false,
                        "url": "tcstate_ns.html",
                        "isopen": false,
                        "children": ""
                    }
                ]
              }
           ]
          }
        ]
    }


    $.leftNav("#tree", menu);


});