const math = require('mathjs')
const AlgebraLatex = require('algebra-latex')
const { derivative , evaluate} = require('mathjs')

const calfx = (fx, value) => {
    const latexinput = fx.replace('\\exp','exp')
    const algebraObj = new AlgebraLatex().parseLatex(latexinput)
    let text = algebraObj.toMath();
    let textconvert = text.replace('exp*x','exp(x)')
    let scope = { x: parseFloat(value) }; 
    let ans = math.evaluate(textconvert,scope)
    return(ans)
}
// calfx("2x\\cdot5",5)
const Error = (xnew, xold) => {
    return Math.abs((xnew - xold) / xnew);
}

const calDiff = (fx,value) =>{
    const latexinput = fx.replace('\\exp','exp')
    const algebraObj = new AlgebraLatex().parseLatex(latexinput)
    let text = algebraObj.toMath();
    let textconvert = text.replace('exp*x','exp(x)')
    let expr = derivative(textconvert, 'x').evaluate({x: parseFloat(value)})
    return expr
}
export { calfx , Error , calDiff}
