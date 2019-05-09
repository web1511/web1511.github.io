$(function () {


    /***** 树菜单 ****/

    var menu = {
        "name": "",
        "level": "0",
        "haschildren": true,
        "url": "javascript:;",
        "isopen": false,
        "children": [
           {
            "name": "默认",
            "level": "1",
            "haschildren": true,
            "url": "javascript:;",
            "isopen": true,
            "children": [
                {
                "name": "A集团公司",
                "level": "2",
                "haschildren": true,
                "url": "javascript:;",
                "isopen": false,
                "children": [
                    {
                    "name": "A集团公司子公司1",
                    "level": "3",
                    "haschildren": false,
                    "url": "javascript:;",
                    "isopen": false,
                    "children": ""
                    }, 
                    {
                        "name": "A集团公司子公司2",
                        "level": "3",
                        "haschildren": false,
                        "url": "javascript:;",
                        "isopen": false,
                        "children": ""
                    }
                ]
              },
              {
                "name": "B集团公司",
                "level": "2",
                "haschildren": true,
                "url": "javascript:;",
                "isopen": false,
                "children": [
                    {
                    "name": "B集团公司子公司1",
                    "level": "3",
                    "haschildren": false,
                    "url": "javascript:;",
                    "isopen": false,
                    "children": ""
                    }, 
                    {
                        "name": "B集团公司子公司2",
                        "level": "3",
                        "haschildren": false,
                        "url": "javascript:;",
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