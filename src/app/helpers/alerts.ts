import Swal, { SweetAlertIcon } from 'sweetalert2';

export class alerts {
  /**
   * Funcion de alertas basicas
   *
   * @static
   * @param {string} title
   * @param {string} text
   * @param {SweetAlertIcon} icon
   * @return {*}
   * @memberof alerts
   */
  static basicAlert(title: string, text: string, icon: SweetAlertIcon) {
    return Swal.fire(title, text, icon);
  }

  /**
   * Funcion para alerta de confirmacion
   *
   * @static
   * @param {string} title
   * @param {string} text
   * @param {SweetAlertIcon} icon
   * @param {string} confirmButtonText
   * @return {*}  {*}
   * @memberof alerts
   */
  static confirmAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    confirmButtonText: string
  ): any {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
    });
  }
}
