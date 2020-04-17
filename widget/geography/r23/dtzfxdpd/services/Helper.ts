export class Helper {
  resetScene (dom: any, valueOption: any, borderColor: string, borderDom: any) {
    dom[0].setAttribute('src', valueOption.image1);
    dom[1].setAttribute('src', valueOption.image2);
    dom[2].setAttribute('src', valueOption.image3);
    dom[3].setAttribute('src', valueOption.image4);
    dom[4].setAttribute('src', valueOption.image5);
    borderDom.style.borderColor = borderColor;
  }
}
