FROM microsoft/iis

RUN mkdir C:\site

RUN powershell -NoProfile -Command \
    Import-module IISAdministration; \
    New-IISSite -Name "AngularNet" -PhysicalPath C:\site -BindingInformation "*:8000:"

EXPOSE 8000

ADD bin/ /site
ADD Views/ /site
ADD public/ /site
ADD web.config /site
