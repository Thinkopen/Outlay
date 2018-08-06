const AbstractController = require('.');
const config = require('config');


class WebsiteController extends AbstractController {

    initRouter(){
        this.router.get('/', (req,res) => WebsiteController.renderIndex(req,res));

    }


    static renderIndex(req,res){
        res.render('index',{ client: '', signedRequest: '',from: '',username: 'Teoxvert'});
        
    }


}


module.exports = WebsiteController;