$(document).ready(function() {
    let currentPage = 1;
    let total;
    const rowsPerPage = 10;
    const linkPagePrev = $('#linkPagePrev');
    const linkPageNext = $('#linkPageNext');
    const paginationPages = $('#paginationPages');

    function loadTablePage(page) {
        if(page<1 || page > total) return;

        linkPagePrev.prop('disabled', true);
        linkPageNext.prop('disabled', true);
        paginationPages.off('click', getPage);
        $.get(`https://www.tender.pro/api/_info.companylist_by_set.json?_key=6dea68e23416b21d201571d4c9263a57&set_type_id=7&set_id=2&max_rows=${rowsPerPage}&offset=${page}`, function(res) {
            const data = JSON.parse(res);
            if(!data.result.data.length) {
                total = page-1;
                page = currentPage;
            } else {
                $("#table tbody").empty();
                data.result.data.forEach(function(item) {
                    $("#table tbody").append(`
              <tr>
                <td>${item.id}</td>
                <td>${item.address}</td>
              </tr>
            `);
                });
            }

            const pageButtons = paginationPages.children();
            let start = page === 1 ? 1 : page === total ? page - 2 : page -1;

            pageButtons.each(function (i,e) {
                e.innerHTML = start;
                if(start === page) {
                    $(e).addClass('current')
                } else {
                    $(e).removeClass('current')
                }
                start++
            })

            currentPage = parseInt(page);
            linkPagePrev.prop('disabled', false);
            linkPageNext.prop('disabled', false);
            paginationPages.click(getPage);
        });


    }

    loadTablePage(1);

    function next() {
        loadTablePage(20000);
    }
    function prev() {
        loadTablePage(currentPage-1);
    }
    function getPage(e) {
        loadTablePage(parseInt(e.target.innerHTML));

    }

    linkPagePrev.click(prev);
    linkPageNext.click(next);

})
