define(["require","jquery","underscore","bundle!all","jrs.configs","backbone","text!scheduler/template/editor/scheduleTabTemplate.htm","components/dateAndTime/DateAndTimePicker","scheduler/view/editor/holidayCalView","scheduler/collection/holidayCalsCollection","localizedMoment"],function(e){"use strict";var t=e("jquery"),n=e("underscore"),a=e("bundle!all"),r=e("jrs.configs"),i=e("backbone"),l=e("text!scheduler/template/editor/scheduleTabTemplate.htm"),c=e("components/dateAndTime/DateAndTimePicker"),d=e("scheduler/view/editor/holidayCalView"),o=e("scheduler/collection/holidayCalsCollection"),s=e("localizedMoment"),h=r.calendar.timepicker.dateFormat,m=r.calendar.timepicker.timeFormat.replace(":ss","");return i.View.extend({events:{"change [name=startType]":"setStartType","change [name=startDate]":"setStartDate","change [name=schedulerTimeZone]":"setTimeZone","change [name=recurrenceType]":"setRecurrenceType","change [name=recurrenceInterval]":"setRecurrenceInterval","change [name=recurrenceIntervalUnit]":"setRecurrenceIntervalUnit","change [name=endat]":"setEnDat","change [name=occurrenceCount]":"setOccurrenceCount","change [name=simpleEndDate]":"setEndDate","change [name=calendarEndDate]":"setEndDate","change [name=whichMonth]":"monthRadioSelector","change [name=monthSelector]":"setMonthSelector","change [name=whichDay]":"dayRadioSelector","change [name=daySelector]":"setDaySelector","change [name=datesInMonth]":"setDatesInMonth","change [name=hours]":"setHours","change [name=minutes]":"setMinutes","change [name=calendarSelect]":"setCalendar"},initialize:function(){this.calCollection=new o,this.calView=new d({collection:this.calCollection}),this.calCollection.fetch({reset:!0,data:{calendarType:"holiday"}}),this.listenTo(this.model,"change:trigger",this.triggerChanged)},render:function(){this.setElement(t(n.template(l,{_:n,i18n:a,timeZones:r.timeZones}))),this.$el.find("[name=calendarBlockHolder]").append(this.calView.$el),this.setupDatepickersOn()},setupDatepickersOn:function(){var e=this;this.$el.find(".datepicker").each(function(n,a){var r=t(a);new c({el:r[0],constrainInput:!0,dateFormat:h,timeFormat:m,showOn:"button",buttonText:""}),r.next().addClass("button").addClass("picker"),e.listenTo(e.model,"change:trigger",function(){var e=s.tz(this.model.get("trigger").timezone).utcOffset();t.datepicker._getInst(t(a)[0]).settings.timepicker.timezone=e}),t(a)[0].getValue=function(){return t(this).val()}})},triggerChanged:function(){var e=this.model.get("trigger");this.$el.find("[name=startType]").filter("[value="+e.startType+"]").prop("checked",!0),this.$el.find("[name=startDate]").val(e.startDate),this.$el.find("[name=schedulerTimeZone]").val(e.timezone),this.$el.find("[name=recurrenceType]").val(e.type),this.$el.find("fieldset[data-recurrence]").addClass("hidden"),this.$el.find('fieldset[data-recurrence="'+e.type+'"]').removeClass("hidden"),"none"===e.type&&this.$el.find("[name=calendarBlockHolder]").addClass("hidden"),"simple"===e.type&&(this.$el.find("[name=recurrenceInterval]").val(e.recurrenceInterval),this.$el.find("[name=recurrenceIntervalUnit]").val(e.recurrenceIntervalUnit),this.$el.find("[name=endat]").filter("[value="+e.radioEndDate+"]").prop("checked",!0),this.$el.find("[name=occurrenceCount]").val(e.occurrenceCount),this.$el.find("[name=simpleEndDate]").val(e.endDate),this.$el.find("[name=calendarBlockHolder]").removeClass("hidden"),this.$el.find("[name=calendarSelect]").val(e.calendarName)),"calendar"===e.type&&(this.$el.find("[name=whichMonth]").filter("[value="+e.radioWhichMonth+"]").prop("checked",!0),this.$el.find("[name=monthSelector]").val(e.months.month),this.$el.find("[name=whichDay]").filter("[value="+e.radioWhichDay+"]").prop("checked",!0),this.$el.find("[name=daySelector]").val(e.weekDays.day),this.$el.find("[name=datesInMonth]").val(e.monthDays),this.$el.find("[name=hours]").val(e.hours),this.$el.find("[name=minutes]").val(e.minutes),this.$el.find("[name=calendarEndDate]").val(e.endDate),this.$el.find("[name=calendarBlockHolder]").removeClass("hidden"),this.$el.find("[name=calendarSelect]").val(e.calendarName))},setStartType:function(e){this.model.update("trigger",{startType:t(e.target).val()})},setStartDate:function(e){this.model.update("trigger",{startType:"2",startDate:t(e.target).val()})},setTimeZone:function(e){this.model.update("trigger",{timezone:t(e.target).val()})},setRecurrenceType:function(e){this.model.update("trigger",{type:t(e.target).val()})},setRecurrenceInterval:function(e){this.model.update("trigger",{recurrenceInterval:t(e.target).val()})},setRecurrenceIntervalUnit:function(e){this.model.update("trigger",{recurrenceIntervalUnit:t(e.target).val()})},setEnDat:function(e){this.model.update("trigger",{radioEndDate:t(e.target).val()})},setOccurrenceCount:function(e){this.model.update("trigger",{occurrenceCount:t(e.target).val()})},setEndDate:function(e){this.model.update("trigger",{endDate:t(e.target).val()})},monthRadioSelector:function(e){this.model.update("trigger",{radioWhichMonth:t(e.target).val()})},setMonthSelector:function(e){for(var n=t(e.target).val()||[],a=0,r=n.length;a<r;a++)n[a]=parseInt(n[a]);this.model.update("trigger",{months:{month:n}})},dayRadioSelector:function(e){this.model.update("trigger",{radioWhichDay:t(e.target).val()})},setDaySelector:function(e){for(var n=t(e.target).val()||[],a=0,r=n.length;a<r;a++)n[a]=parseInt(n[a]);this.model.update("trigger",{weekDays:{day:n}})},setDatesInMonth:function(e){this.model.update("trigger",{monthDays:t(e.target).val()})},setHours:function(e){this.model.update("trigger",{hours:t(e.target).val()})},setMinutes:function(e){this.model.update("trigger",{minutes:t(e.target).val()})},setCalendar:function(e){this.model.update("trigger",{calendarName:t(e.target).val()})}})});