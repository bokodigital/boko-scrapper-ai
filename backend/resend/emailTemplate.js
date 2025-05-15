

const welcomeMailTemplate = (companyName, companyUrl) => {
    try {
        const template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <div
    style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
  >
    Bienvenido a Relais - ¡Gracias por unirte a nosotros!
    <div>
       ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
    </div>
  </div>
 
    <table class="m_1593303981599524302email-body_inner" style="width: 570px; margin: 0 auto; padding: 0; background-color: #fff;" role="presentation" width="570" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="word-break: break-word; font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; padding: 45px;"><div><table id="m_1593303981599524302m_-5188615138573634245tpf_t_builder" style="max-width: 600px; width: 600px; margin: auto;" width="600" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="word-break: break-word; font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; border-radius: 2px; background-size: cover; background-repeat: no-repeat; background-position: top; background-color: #fff; background-image: none; border: 1px solid #dedede;" bgcolor="#fff"><table id="m_1593303981599524302m_-5188615138573634245tpf_1001" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: #2a9fe9; padding: 0; border: 0 none transparent;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="#2a9fe9"><tbody><tr><td id="m_1593303981599524302m_-5188615138573634245tpf_1002" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 36px 48px 36px 48px; background-size: 100%; background-position: top; width: 100%; text-align: center; background-image: none; background-color: #2a9fe9; border: 0 none transparent;" align="center" bgcolor="#2a9fe9" width="100%"><table id="m_1593303981599524302m_-5188615138573634245tpf_1003" style="table-layout: fixed; width: 100%; margin: 0 auto 0 auto; box-sizing: border-box; color: #fff; font-size: 30px; line-height: 150%; font-weight: 400; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; text-align: center;" width="100%" cellspacing="0" cellpadding="0" align="center"><tbody><tr style="color: #fff; font-size: 30px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"><td style="word-break: break-word; vertical-align: top; box-sizing: border-box; padding: 0; background-size: cover; background-repeat: no-repeat; color: #fff; font-size: 30px; font-weight: 400; line-height: 150%; text-align: center; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; background-color: transparent; background-image: none; border: 0 none transparent;" align="center" bgcolor="transparent"><div style="color: #fff; font-size: 30px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Bienvenido a Relais</div></td></tr></tbody></table></td></tr></tbody></table><table id="m_1593303981599524302m_-5188615138573634245tpf_1014" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: transparent; padding: 12px 10px 12px 10px; border: 1px none #ddd;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="transparent"><tbody><tr><td id="m_1593303981599524302m_-5188615138573634245tpf_1015" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 10px; background-size: 100%; background-position: top; width: 100%; text-align: center; background-image: none; background-color: transparent; border: 1px none #ddd;" align="center" bgcolor="transparent" width="100%"><table id="m_1593303981599524302m_-5188615138573634245tpf_1016" style="table-layout: fixed; width: 100%; height: auto; max-width: 600px; box-sizing: border-box; background-color: transparent;" width="100%" cellspacing="0" cellpadding="0" align="center" bgcolor="transparent"><tbody><tr><td style="word-break: break-word; font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; padding: 0; box-sizing: border-box; vertical-align: middle; text-align: center;" align="center"><p style="line-height: 1.625; color: #636363; font-size: 14px; padding: 10px 0 10px 0; margin: 0; display: inline-block; vertical-align: middle; width: 30%; height: auto; border: 0 none transparent;"><img class="CToWUd" style="border: none; font-size: 14px; font-weight: bold; outline: 0; text-decoration: none; text-transform: capitalize; vertical-align: middle; margin-right: 10px; max-width: 100%; max-height: 100%; display: block; width: 167.512px; height: 54.6875px;" src="https://relaisoft.org/wp-content/uploads/2025/01/logo-small-edited.png" alt="Image" width="167.512" height="54.6875" border="0" data-bit="iit" /></p></td></tr></tbody></table></td></tr></tbody></table>
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1004" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: transparent; padding: 0; border: 0 none transparent;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="transparent">
    <tbody>
    <tr>
    <td id="m_1593303981599524302m_-5188615138573634245tpf_1005" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 48px 48px 0 48px; background-size: 100%; background-position: top; width: 100%; text-align: left; background-image: none; background-color: transparent; border: 0 none transparent;" align="left" bgcolor="transparent" width="100%">&nbsp;
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1006" style="table-layout: fixed; width: 100%; margin: 0 auto 0 auto; box-sizing: border-box; color: #636363; font-size: 14px; line-height: 150%; font-weight: 400; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; text-align: left;" width="100%" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">
    <td style="word-break: break-word; vertical-align: top; box-sizing: border-box; padding: 0 0 15px 0; background-size: cover; background-repeat: no-repeat; color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; text-align: left; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; background-color: transparent; background-image: none; border: 0 none transparent;" align="left" bgcolor="transparent">
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Hola, ¡bienvenido a bordo!</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Nos entusiasma contar con tu presencia. Nuestra herramienta de scraping con IA está aquí para ayudarte a recopilar los datos que necesitas de forma más rápida, inteligente y eficiente.</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Para empezar, sigue estos sencillos pasos:</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">1. Inicia sesión en tu cuenta <a href="https://relaisia.com" style="color: #2a9fe9; text-decoration: underline;">relaisia.com</a></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">2. Explora nuestras funciones para aprender a empezar a scrapear.</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">3. Personaliza tu configuración de scraping y deja que la IA haga el trabajo duro por ti.</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">¿Necesitas ayuda? Nuestro equipo de soporte está a solo un correo electrónico. No dudes en contactarnos en <a href="mailto:contacto@relaisoft.org" style="color: #2a9fe9; text-decoration: underline;">contacto@relaisoft.org</a> para obtener ayuda.</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Gracias por elegir Relais. ¡Esperamos ayudarte a alcanzar tus objetivos!</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">¡Que disfrutes scrapeando! 🚀</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Esperamos verte pronto.</div>
    &nbsp;</td>
    </tr>
    </tbody>
    </table>
    &nbsp;</td>
    </tr>
    </tbody>
    </table>
    &nbsp;
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1011" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: transparent; padding: 0; border: 0 none transparent;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="transparent">
    <tbody>
    <tr>
    <td id="m_1593303981599524302m_-5188615138573634245tpf_1012" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 0 48px 48px 48px; background-size: 100%; background-position: top; width: 100%; text-align: center; background-image: none; background-color: transparent; border: 0 none transparent;" align="center" bgcolor="transparent" width="100%">
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1013" style="table-layout: fixed; width: 100%; margin: 0 auto 0 auto; box-sizing: border-box; color: #636363; font-size: 13px; line-height: 150%; font-weight: 400; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; text-align: center;" width="100%" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">
    <td style="word-break: break-word; vertical-align: top; box-sizing: border-box; padding: 15px; background-size: cover; background-repeat: no-repeat; color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; text-align: center; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; background-color: transparent; background-image: none; border: 0 none transparent;" align="center" bgcolor="transparent">
    <div style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="#m_1593303981599524302_m_-5188615138573634245_" rel="nofollow">Relais</a></div><div style="margin-top:15px;color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="mailto:contacto@relaisoft.org" rel="nofollow">contacto@relaisoft.org</a></div><div style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="tel:+17034544144" rel="nofollow">(+1) (703)4544144</a></div><div style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="#" rel="nofollow">Edificio Sede MERCOSUR, Luis P. Piera 1992, Piso 2, Montevideo, Uruguay.</a></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table>

</body>
</html>

`
        return template
    }
    catch (err) {
        throw new Error(err)
    }
}


const resetPasswordMailTemplate = (companyName, resetPasswordLink) => {
    try {
        const template =`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <div
    style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
  >
    ${companyName} restablecer su contraseña
    <div>
       ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
    </div>
  </div>
 
    <table class="m_1593303981599524302email-body_inner" style="width: 570px; margin: 0 auto; padding: 0; background-color: #fff;" role="presentation" width="570" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="word-break: break-word; font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; padding: 45px;"><div><table id="m_1593303981599524302m_-5188615138573634245tpf_t_builder" style="max-width: 600px; width: 600px; margin: auto;" width="600" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="word-break: break-word; font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; border-radius: 2px; background-size: cover; background-repeat: no-repeat; background-position: top; background-color: #fff; background-image: none; border: 1px solid #dedede;" bgcolor="#fff"><table id="m_1593303981599524302m_-5188615138573634245tpf_1001" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: #2a9fe9; padding: 0; border: 0 none transparent;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="#2a9fe9"><tbody><tr><td id="m_1593303981599524302m_-5188615138573634245tpf_1002" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 36px 48px 36px 48px; background-size: 100%; background-position: top; width: 100%; text-align: center; background-image: none; background-color: #2a9fe9; border: 0 none transparent;" align="center" bgcolor="#2a9fe9" width="100%"><table id="m_1593303981599524302m_-5188615138573634245tpf_1003" style="table-layout: fixed; width: 100%; margin: 0 auto 0 auto; box-sizing: border-box; color: #fff; font-size: 30px; line-height: 150%; font-weight: 400; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; text-align: center;" width="100%" cellspacing="0" cellpadding="0" align="center"><tbody><tr style="color: #fff; font-size: 30px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"><td style="word-break: break-word; vertical-align: top; box-sizing: border-box; padding: 0; background-size: cover; background-repeat: no-repeat; color: #fff; font-size: 30px; font-weight: 400; line-height: 150%; text-align: center; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; background-color: transparent; background-image: none; border: 0 none transparent;" align="center" bgcolor="transparent"><div style="color: #fff; font-size: 30px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Restablecer su contraseña</div></td></tr></tbody></table></td></tr></tbody></table><table id="m_1593303981599524302m_-5188615138573634245tpf_1014" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: transparent; padding: 12px 10px 12px 10px; border: 1px none #ddd;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="transparent"><tbody><tr><td id="m_1593303981599524302m_-5188615138573634245tpf_1015" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 10px; background-size: 100%; background-position: top; width: 100%; text-align: center; background-image: none; background-color: transparent; border: 1px none #ddd;" align="center" bgcolor="transparent" width="100%"><table id="m_1593303981599524302m_-5188615138573634245tpf_1016" style="table-layout: fixed; width: 100%; height: auto; max-width: 600px; box-sizing: border-box; background-color: transparent;" width="100%" cellspacing="0" cellpadding="0" align="center" bgcolor="transparent"><tbody><tr><td style="word-break: break-word; font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; padding: 0; box-sizing: border-box; vertical-align: middle; text-align: center;" align="center"><p style="line-height: 1.625; color: #636363; font-size: 14px; padding: 10px 0 10px 0; margin: 0; display: inline-block; vertical-align: middle; width: 30%; height: auto; border: 0 none transparent;"><img class="CToWUd" style="border: none; font-size: 14px; font-weight: bold; outline: 0; text-decoration: none; text-transform: capitalize; vertical-align: middle; margin-right: 10px; max-width: 100%; max-height: 100%; display: block; width: 167.512px; height: 54.6875px;" src="https://relaisoft.org/wp-content/uploads/2025/01/logo-small-edited.png" alt="Image" width="167.512" height="54.6875" border="0" data-bit="iit" /></p></td></tr></tbody></table></td></tr></tbody></table>
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1004" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: transparent; padding: 0; border: 0 none transparent;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="transparent">
    <tbody>
    <tr>
    <td id="m_1593303981599524302m_-5188615138573634245tpf_1005" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 48px 48px 0 48px; background-size: 100%; background-position: top; width: 100%; text-align: left; background-image: none; background-color: transparent; border: 0 none transparent;" align="left" bgcolor="transparent" width="100%">&nbsp;
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1006" style="table-layout: fixed; width: 100%; margin: 0 auto 0 auto; box-sizing: border-box; color: #636363; font-size: 14px; line-height: 150%; font-weight: 400; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; text-align: left;" width="100%" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">
    <td style="word-break: break-word; vertical-align: top; box-sizing: border-box; padding: 0 0 15px 0; background-size: cover; background-repeat: no-repeat; color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; text-align: left; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; background-color: transparent; background-image: none; border: 0 none transparent;" align="left" bgcolor="transparent">
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Hi,</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Hemos recibido una solicitud para restablecer la contraseña de su cuenta</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <!-- <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Nombre de usuario: {username}<span style="color: #888888;"><span style="color: #888888;"><br style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;" /></span></span></div> -->
    &nbsp;
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Si usted no realizó esta solicitud, puede ignorar este correo y su contraseña permanecerá sin cambios.<span style="color: #888888;"><span style="color: #888888;"><br style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;" /></span></span></div>
    &nbsp;
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Para restablecer su contraseña, por favor haga clic en el siguiente botón.<span style="color: #888888;"><span style="color: #888888;"><br style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;" /></span></span></div>
    &nbsp;
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">
        
        <a
                      href= ${resetPasswordLink}
                      style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;background-color:#2a9fe9;border-radius:4px;color:#fff;font-family:&#x27;Open Sans&#x27;, &#x27;Helvetica Neue&#x27;, Arial;font-size:15px;text-align:center;width:210px;padding:14px 7px 14px 7px"
                      target="_blank"
                      ><span
                        ><!--[if mso
                          ]><i
                            style="mso-font-width:350%;mso-text-raise:21"
                            hidden
                            >&#8202;</i
                          ><!
                        [endif]--></span
                      ><span
                        style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:10.5px"
                        >Reset password</span
                      ><span
                        ><!--[if mso
                          ]><i style="mso-font-width:350%" hidden
                            >&#8202;&#8203;</i
                          ><!
                        [endif]--></span
                      ></a>
    </div>
    &nbsp;</td>
    </tr>
    </tbody>
    </table>
    &nbsp;</td>
    </tr>
    </tbody>
    </table>
    &nbsp;
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1011" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: transparent; padding: 0; border: 0 none transparent;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="transparent">
    <tbody>
    <tr>
    <td id="m_1593303981599524302m_-5188615138573634245tpf_1012" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 0 48px 48px 48px; background-size: 100%; background-position: top; width: 100%; text-align: center; background-image: none; background-color: transparent; border: 0 none transparent;" align="center" bgcolor="transparent" width="100%">
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1013" style="table-layout: fixed; width: 100%; margin: 0 auto 0 auto; box-sizing: border-box; color: #636363; font-size: 13px; line-height: 150%; font-weight: 400; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; text-align: center;" width="100%" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">
    <td style="word-break: break-word; vertical-align: top; box-sizing: border-box; padding: 15px; background-size: cover; background-repeat: no-repeat; color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; text-align: center; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; background-color: transparent; background-image: none; border: 0 none transparent;" align="center" bgcolor="transparent">
    <div style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="#m_1593303981599524302_m_-5188615138573634245_" rel="nofollow">Relais</a></div><div style="margin-top:15px;color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="mailto:contacto@relaisoft.org" rel="nofollow">contacto@relaisoft.org</a></div><div style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="tel:+17034544144" rel="nofollow">(+1) (703)4544144</a></div><div style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="#" rel="nofollow">Edificio Sede MERCOSUR, Luis P. Piera 1992, Piso 2, Montevideo, Uruguay.</a></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table>

</body>
</html>

`
        return template

    } catch (error) {
        throw new Error(error)
    }
}


const resetPasswordSuccessfullyMailTemplate = (companyName) => {
    try {
        const template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <div
    style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
  >
    Su contraseña ha sido cambiada
    <div>
       ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
    </div>
  </div>
 
    <table class="m_1593303981599524302email-body_inner" style="width: 570px; margin: 0 auto; padding: 0; background-color: #fff;" role="presentation" width="570" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="word-break: break-word; font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; padding: 45px;"><div><table id="m_1593303981599524302m_-5188615138573634245tpf_t_builder" style="max-width: 600px; width: 600px; margin: auto;" width="600" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="word-break: break-word; font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; border-radius: 2px; background-size: cover; background-repeat: no-repeat; background-position: top; background-color: #fff; background-image: none; border: 1px solid #dedede;" bgcolor="#fff"><table id="m_1593303981599524302m_-5188615138573634245tpf_1001" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: #2a9fe9; padding: 0; border: 0 none transparent;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="#2a9fe9"><tbody><tr><td id="m_1593303981599524302m_-5188615138573634245tpf_1002" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 36px 48px 36px 48px; background-size: 100%; background-position: top; width: 100%; text-align: center; background-image: none; background-color: #2a9fe9; border: 0 none transparent;" align="center" bgcolor="#2a9fe9" width="100%"><table id="m_1593303981599524302m_-5188615138573634245tpf_1003" style="table-layout: fixed; width: 100%; margin: 0 auto 0 auto; box-sizing: border-box; color: #fff; font-size: 30px; line-height: 150%; font-weight: 400; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; text-align: center;" width="100%" cellspacing="0" cellpadding="0" align="center"><tbody><tr style="color: #fff; font-size: 30px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"><td style="word-break: break-word; vertical-align: top; box-sizing: border-box; padding: 0; background-size: cover; background-repeat: no-repeat; color: #fff; font-size: 30px; font-weight: 400; line-height: 150%; text-align: center; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; background-color: transparent; background-image: none; border: 0 none transparent;" align="center" bgcolor="transparent"><div style="color: #fff; font-size: 30px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Contraseña Actualizada</div></td></tr></tbody></table></td></tr></tbody></table><table id="m_1593303981599524302m_-5188615138573634245tpf_1014" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: transparent; padding: 12px 10px 12px 10px; border: 1px none #ddd;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="transparent"><tbody><tr><td id="m_1593303981599524302m_-5188615138573634245tpf_1015" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 10px; background-size: 100%; background-position: top; width: 100%; text-align: center; background-image: none; background-color: transparent; border: 1px none #ddd;" align="center" bgcolor="transparent" width="100%"><table id="m_1593303981599524302m_-5188615138573634245tpf_1016" style="table-layout: fixed; width: 100%; height: auto; max-width: 600px; box-sizing: border-box; background-color: transparent;" width="100%" cellspacing="0" cellpadding="0" align="center" bgcolor="transparent"><tbody><tr><td style="word-break: break-word; font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; padding: 0; box-sizing: border-box; vertical-align: middle; text-align: center;" align="center"><p style="line-height: 1.625; color: #636363; font-size: 14px; padding: 10px 0 10px 0; margin: 0; display: inline-block; vertical-align: middle; width: 30%; height: auto; border: 0 none transparent;"><img class="CToWUd" style="border: none; font-size: 14px; font-weight: bold; outline: 0; text-decoration: none; text-transform: capitalize; vertical-align: middle; margin-right: 10px; max-width: 100%; max-height: 100%; display: block; width: 167.512px; height: 54.6875px;" src="https://relaisoft.org/wp-content/uploads/2025/01/logo-small-edited.png" alt="Image" width="167.512" height="54.6875" border="0" data-bit="iit" /></p></td></tr></tbody></table></td></tr></tbody></table>
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1004" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: transparent; padding: 0; border: 0 none transparent;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="transparent">
    <tbody>
    <tr>
    <td id="m_1593303981599524302m_-5188615138573634245tpf_1005" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 48px 48px 0 48px; background-size: 100%; background-position: top; width: 100%; text-align: left; background-image: none; background-color: transparent; border: 0 none transparent;" align="left" bgcolor="transparent" width="100%">&nbsp;
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1006" style="table-layout: fixed; width: 100%; margin: 0 auto 0 auto; box-sizing: border-box; color: #636363; font-size: 14px; line-height: 150%; font-weight: 400; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; text-align: left;" width="100%" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">
    <td style="word-break: break-word; vertical-align: top; box-sizing: border-box; padding: 0 0 15px 0; background-size: cover; background-repeat: no-repeat; color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; text-align: left; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; background-color: transparent; background-image: none; border: 0 none transparent;" align="left" bgcolor="transparent">
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Hola,</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Te informamos que la contraseña de tu cuenta en Relais ha sido cambiada exitosamente.</div>
    <br/>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Si realizaste este cambio, no es necesario que hagas nada más. Ya puedes iniciar sesión con tu nueva contraseña.</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <br/>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Si NO realizaste este cambio, por favor contacta inmediatamente a nuestro equipo de soporte en <a href="mailto:contacto@relaisoft.org" style="color: #2a9fe9; text-decoration: underline;">contacto@relaisoft.org</a> o llama al (+1) (703)4544144 para asegurar tu cuenta.</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <br/>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Gracias por confiar en Relais.</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"></div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">Saludos cordiales,</div>
    <div style="color: #636363; font-size: 14px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">El equipo de Relais</div>
    &nbsp;</td>
    </tr>
    </tbody>
    </table>
    &nbsp;</td>
    </tr>
    </tbody>
    </table>
    &nbsp;
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1011" style="border-spacing: 0; width: 100%; table-layout: fixed; max-width: 100%; margin: 0 auto 0 auto; background-size: 100%; background-repeat: no-repeat; background-position: top; background-image: none; background-color: transparent; padding: 0; border: 0 none transparent;" width="100%" cellspacing="0px" cellpadding="0" align="center" bgcolor="transparent">
    <tbody>
    <tr>
    <td id="m_1593303981599524302m_-5188615138573634245tpf_1012" style="font-family: 'Nunito Sans',Helvetica,Arial,sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; word-break: break-word; padding: 0 48px 48px 48px; background-size: 100%; background-position: top; width: 100%; text-align: center; background-image: none; background-color: transparent; border: 0 none transparent;" align="center" bgcolor="transparent" width="100%">
    <table id="m_1593303981599524302m_-5188615138573634245tpf_1013" style="table-layout: fixed; width: 100%; margin: 0 auto 0 auto; box-sizing: border-box; color: #636363; font-size: 13px; line-height: 150%; font-weight: 400; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; text-align: center;" width="100%" cellspacing="0" cellpadding="0" align="center">
    <tbody>
    <tr style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;">
    <td style="word-break: break-word; vertical-align: top; box-sizing: border-box; padding: 15px; background-size: cover; background-repeat: no-repeat; color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; text-align: center; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; background-color: transparent; background-image: none; border: 0 none transparent;" align="center" bgcolor="transparent">
    <div style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="#m_1593303981599524302_m_-5188615138573634245_" rel="nofollow">Relais</a></div><div style="margin-top:15px;color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="mailto:contacto@relaisoft.org" rel="nofollow">contacto@relaisoft.org</a></div><div style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="tel:+17034544144" rel="nofollow">(+1) (703)4544144</a></div><div style="color: #636363; font-size: 13px; font-weight: 400; line-height: 150%; font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;"><a style="font-weight: 400; text-decoration: none; color: inherit;" href="#" rel="nofollow">Edificio Sede MERCOSUR, Luis P. Piera 1992, Piso 2, Montevideo, Uruguay.</a></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table>

</body>
</html>

`
        return template

    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    welcomeMailTemplate,
    resetPasswordMailTemplate,
    resetPasswordSuccessfullyMailTemplate,
}